import { NextRequest, NextResponse } from "next/server";
import {
  validateLetterInputs,
  generateSantaLetter,
  checkRateLimit,
} from "@/lib/letter-generator";
import { PersonalizationData } from "@/components/personalize/types";

export async function POST(request: NextRequest) {
  try {
    // Determine client IP for basic rate limiting
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";

    // Check rate limit
    const rateCheck = checkRateLimit(clientIp);
    if (!rateCheck.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Too many requests from this location. Please wait ${rateCheck.retryAfter || 30} seconds before generating again.`,
          code: "RATE_LIMITED",
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Please send valid JSON.",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload. Expected a JSON object.",
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    // Validate inputs
    const validation = validateLetterInputs(body as Partial<PersonalizationData>);
    if (!validation.isValid || !validation.sanitized) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join(" "),
          code: "INVALID_INPUT",
        },
        { status: 400 }
      );
    }

    // Generate letter via OpenAI
    const result = await generateSantaLetter(validation.sanitized);

    if (!result.success) {
      let statusCode = 500;
      if (result.code === "MISSING_API_KEY") {
        statusCode = 503;
      } else if (result.code === "PRODUCT_NOT_SUPPORTED") {
        statusCode = 400;
      } else if (result.code === "RATE_LIMITED") {
        statusCode = 429;
      } else if (result.code === "PARSING_ERROR" || result.code === "PROVIDER_ERROR") {
        statusCode = 502;
      }

      return NextResponse.json(result, { status: statusCode });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected server error occurred. Please try again.",
        code: "PROVIDER_ERROR",
      },
      { status: 500 }
    );
  }
}
