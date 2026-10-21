import OpenAI from "openai";
import {
  PersonalizationData,
  GeneratedSantaLetter,
  GenerateLetterResponse,
} from "@/components/personalize/types";

// In-memory rate limiting map: IP -> array of request timestamps (ms)
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 6;

/**
 * Basic in-memory rate limiter for development and single-instance environments
 */
export function checkRateLimit(clientIp: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const timestamps = rateLimitMap.get(clientIp) || [];
  
  // Clean up timestamps outside the window
  const recentTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    const oldest = recentTimestamps[0];
    const retryAfter = Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfter };
  }

  recentTimestamps.push(now);
  rateLimitMap.set(clientIp, recentTimestamps);
  return { allowed: true };
}

/**
 * Validates and sanitizes customer inputs before sending to AI
 */
export function validateLetterInputs(data: Partial<PersonalizationData>): {
  isValid: boolean;
  errors: string[];
  sanitized?: PersonalizationData;
} {
  const errors: string[] = [];

  // Check product includes letter
  if (data.productId !== "letter" && data.productId !== "bundle") {
    errors.push("Selected product does not include a personalized Santa letter.");
  }

  // Required field checks & length limits
  const childName = (data.childName || "").trim().slice(0, 80);
  if (!childName) {
    errors.push("Child's first name is required.");
  }

  const childAge = (data.childAge || "").trim().slice(0, 40);
  if (!childAge) {
    errors.push("Child's age is required.");
  }

  const favoriteHobby = (data.favoriteHobby || "").trim().slice(0, 250);
  if (!favoriteHobby) {
    errors.push("Favourite hobby or activity is required.");
  }

  const achievements = (data.achievements || "").trim().slice(0, 500);
  if (!achievements) {
    errors.push("Child's achievements from the past year are required.");
  }

  const giftWish = (data.giftWish || "").trim().slice(0, 250);
  if (!giftWish) {
    errors.push("Child's Christmas gift wish is required.");
  }

  // Optional fields with sensible bounds
  const favoriteInterest = (data.favoriteInterest || "").trim().slice(0, 200);
  const learnedSkill = (data.learnedSkill || "").trim().slice(0, 250);
  const kindAction = (data.kindAction || "").trim().slice(0, 250);
  const parentMessage = (data.parentMessage || "").trim().slice(0, 400);
  const avoidMentioning = (data.avoidMentioning || "").trim().slice(0, 300);
  const pronunciationGuide = (data.pronunciationGuide || "").trim().slice(0, 100);

  const messageTone = data.messageTone || "magical";
  const stationeryTheme = data.stationeryTheme || "airmail";
  const letterGreetingStyle = data.letterGreetingStyle || "workshop";
  const santaScene = data.santaScene || "fireplace";
  const language = data.language || "en";
  const guardianConfirmed = Boolean(data.guardianConfirmed);

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  const sanitized: PersonalizationData = {
    productId: data.productId as "letter" | "bundle",
    childName,
    childAge,
    pronunciationGuide,
    favoriteHobby,
    favoriteInterest,
    achievements,
    learnedSkill,
    kindAction,
    giftWish,
    parentMessage,
    avoidMentioning,
    santaScene,
    messageTone,
    stationeryTheme,
    letterGreetingStyle,
    language,
    guardianConfirmed,
  };

  return { isValid: true, errors: [], sanitized };
}

/**
 * Builds an authentic, heartwarming, personalized Santa letter incorporating
 * the customer's submitted details (child name, age, hobbies, achievements, wishes, etc.).
 * Guarantees a reliable, beautiful letter experience without requiring an external AI key.
 */
export function buildPersonalizedSantaLetter(
  data: PersonalizationData
): GeneratedSantaLetter {
  const childName = (data.childName || "Special Child").trim();
  const hobby = (data.favoriteHobby || "").trim();
  const achievements = (data.achievements || "").trim();
  const giftWish = (data.giftWish || "").trim();
  const interest = (data.favoriteInterest || "").trim();
  const learnedSkill = (data.learnedSkill || "").trim();
  const kindAction = (data.kindAction || "").trim();
  const parentMessage = (data.parentMessage || "").trim();
  const tone = data.messageTone || "magical";
  const greetingStyle = data.letterGreetingStyle || "workshop";
  const avoidList = (data.avoidMentioning || "")
    .toLowerCase()
    .split(/[,;\n]+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1);

  // Helper to ensure avoided topics are never mentioned
  const isSafeText = (text: string) => {
    if (!text || avoidList.length === 0) return true;
    const lower = text.toLowerCase();
    return !avoidList.some((forbidden) => lower.includes(forbidden));
  };

  // 1. Personalized Greeting
  let greeting = `Ho Ho Ho, My Dearest Friend ${childName}!`;
  if (greetingStyle === "official") {
    greeting = `Official North Pole Greetings to ${childName}!`;
  } else if (greetingStyle === "fireside") {
    greeting = `Warm Fireside Greetings, Sweet ${childName}!`;
  }

  // 2. Paragraph 1: Festive North Pole Setting
  let para1 = "";
  if (tone === "playful") {
    para1 = `As the fresh arctic snow whirls outside my workshop window, I am sitting beside my crackling fireplace with a big mug of hot cocoa topped with extra peppermint marshmallows! Bernard the head elf just hurried into my study with the biggest grin on his face and placed your special North Pole record file right at the top of my desk.`;
  } else if (tone === "traditional") {
    para1 = `As the silent winter snow blankets the rooftops and evergreen pines here at the North Pole, I am seated in my warm leather armchair by the glowing hearth. The Great Book of Good Deeds is open across my lap, and tonight, with peace and joy in my heart, my golden quill has turned directly to your name.`;
  } else {
    para1 = `As the magical northern lights dance across the starry Arctic sky in brilliant shades of emerald and gold, I am writing to you straight from my cozy North Pole study. Mrs. Claus is baking fresh gingerbread treats, the workshop is bustling with holiday carols, and Rudolph gave an extra cheerful stomp in the stables because tonight, I am writing this very special letter just for you.`;
  }

  // 3. Paragraph 2: Child's Hobbies and Specific Achievements
  let hobbySentence = "";
  if (hobby && isSafeText(hobby)) {
    if (interest && isSafeText(interest)) {
      hobbySentence = `The scout elves were so excited to tell me all about your passion for ${hobby}, and they even mentioned how much you love ${interest}!`;
    } else {
      hobbySentence = `The scout elves spoke with sparkling eyes all about your great enthusiasm for ${hobby}!`;
    }
  } else if (interest && isSafeText(interest)) {
    hobbySentence = `The scout elves brought wonderful reports of how much you enjoy ${interest}!`;
  } else {
    hobbySentence = `The scout elves have brought wonderful reports of all the curiosity, energy, and joy you share every day.`;
  }

  let achievementSentence = "";
  if (achievements && isSafeText(achievements)) {
    achievementSentence = ` Most of all, I want you to know how tremendously proud I am of how hard you worked this year, especially how you ${achievements}. Trying your best and staying brave is what true champions do, and all of us at the North Pole are cheering for you!`;
  } else {
    achievementSentence = ` Most of all, I am so very proud of your good deeds, your brave spirit, and how much you have grown over this past year. You have brought so much happiness to your family and everyone around you!`;
  }
  const para2 = `${hobbySentence}${achievementSentence}`;

  // 4. Paragraph 3: New Skills, Kindness, Parent Encouragement & Christmas Wish
  const partsPara3: string[] = [];
  if (learnedSkill && isSafeText(learnedSkill)) {
    partsPara3.push(`Learning ${learnedSkill} shows how capable, determined, and clever you are.`);
  }
  if (kindAction && isSafeText(kindAction)) {
    partsPara3.push(`Even more special to Mrs. Claus and me was hearing how you ${kindAction}. A kind heart is the greatest treasure in the entire world.`);
  }
  if (parentMessage && isSafeText(parentMessage)) {
    partsPara3.push(`Always hold these special words close to your heart: "${parentMessage}".`);
  }
  if (giftWish && isSafeText(giftWish)) {
    partsPara3.push(
      `My toy workshop elves have carefully noted down your Christmas wish for ${giftWish}. The toy workshop is bustling with ribbons, paint, and merry cheer, and while Mrs. Claus and I always love keeping Christmas morning full of joyful surprises and gratitude, I know this holiday season will bring you wonderful memories with your loved ones.`
    );
  } else {
    partsPara3.push(
      `The workshop elves are busy packaging special surprises, and while we keep the final Christmas morning gifts wrapped in wonder, I know this holiday will bring countless magical memories for you and your family.`
    );
  }
  const para3 = partsPara3.join(" ");

  // 5. Paragraph 4: Christmas Eve Blessings & Encouragement
  let para4 = "";
  if (tone === "playful") {
    para4 = `Tonight, Dasher, Dancer, and Rudolph are crunching on their sweet peppermint carrots to get ready for our midnight flight across the rooftops. Remember to get tucked into bed nice and early on Christmas Eve, and keep spreading your wonderful giggles and smiles wherever you go!`;
  } else if (tone === "traditional") {
    para4 = `As the reindeer rest peacefully in their cozy stables awaiting our Christmas Eve journey, Mrs. Claus and I send you and your family our warmest holiday blessings. Cherish the people who love you, stay brave and true, and always carry the spirit of Christmas generosity with you.`;
  } else {
    para4 = `Always keep that bright spark of wonder in your heart, believe in yourself, and remember how deeply loved you are. Rudolph and the reindeer send a gentle chime of their silver sleigh bells, and we are counting down the sleeps until our magical flight across the starlit sky to your home!`;
  }

  // Closing based on tone
  let closing = "With all my love, peppermint cheer, and Christmas magic,";
  if (tone === "playful") {
    closing = "With jolly giggles and North Pole peppermint cheer,";
  } else if (tone === "traditional") {
    closing = "With timeless blessings and warmest Christmas wishes,";
  }

  return {
    title: "Official North Pole Keepsake Letter",
    greeting,
    body: [para1, para2, para3, para4],
    closing,
    signature: "Santa Claus",
    location: "Santa's Workshop • Arctic Circle, North Pole 99705",
  };
}

/**
 * Server-side AI Santa Letter Generator with seamless personalized fallback
 */
export async function generateSantaLetter(
  data: PersonalizationData
): Promise<GenerateLetterResponse> {
  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

  // Double-check product supports letter
  if (data.productId !== "letter" && data.productId !== "bundle") {
    return {
      success: false,
      error: "The selected experience does not include a personalized Santa letter.",
      code: "PRODUCT_NOT_SUPPORTED",
    };
  }

  // If OpenAI API key is not configured, generate letter via North Pole personalized engine
  if (!apiKey || apiKey.trim() === "" || apiKey === "your_openai_api_key_here") {
    const letter = buildPersonalizedSantaLetter(data);
    return {
      success: true,
      letter,
      meta: {
        modelUsed: "north-pole-personalized-engine",
        generatedAt: new Date().toISOString(),
        product: data.productId,
      },
    };
  }

  const openai = new OpenAI({ apiKey });

  // Map tone to detailed guidelines
  let toneInstruction = "";
  if (data.messageTone === "playful") {
    toneInstruction = "Warm, jolly, and playfully humorous with gentle elf jokes, reindeer antics, and festive giggles.";
  } else if (data.messageTone === "traditional") {
    toneInstruction = "Classic, nostalgic, authentic North Pole Santa Claus with timeless warmth and a traditional Ho-Ho-Ho spirit.";
  } else {
    toneInstruction = "Magical, heartwarming, gentle, inspiring, focused on love, kindness, and Christmas wonder.";
  }

  // System Prompt for Santa Claus
  const systemPrompt = `You are Santa Claus writing an official, heartfelt, personalized Christmas letter to a child from your North Pole workshop.

Write with genuine warmth, wonder, and authentic North Pole magic. Speaking directly to the child.

MANDATORY RULES:
1. Address the child directly by their first name.
2. Adapt vocabulary, sentence structure, and warmth appropriately to the child's age group.
3. Naturally celebrate their favorite hobby or activity.
4. Celebrate their specific achievements from the past year with authentic praise.
5. If provided, warmly acknowledge something new they learned or a kind thing they did.
6. Acknowledge their Christmas wish with excitement and imagination, but DO NOT promise or guarantee delivery of any specific gift (encourage Christmas morning surprises and gratitude).
7. Match the requested tone: ${toneInstruction}.
8. STRICT NEGATIVE CONSTRAINTS:
   - Do NOT invent fictional achievements, family members, pets, or events that were not provided.
   - Do NOT shame, threaten, scold, or say the child must behave perfectly to receive presents.
   - Do NOT tell the child they were almost on the Naughty List. Santa's message is pure encouragement and love.
   - If the parent asked Santa to avoid mentioning any topics, NEVER mention them or anything related to them.
   - Do NOT expose private parental guidance as instructions; seamlessly weave encouragement as Santa's own loving wisdom.
   - If optional details are absent, simply omit them naturally without placeholder text.

OUTPUT FORMAT:
You MUST respond with valid JSON matching this exact structure:
{
  "title": "A Special Letter from Santa",
  "greeting": "Dear [Child Name],",
  "body": [
    "Paragraph 1 (Warm North Pole opening greeting, snowy workshop atmosphere)",
    "Paragraph 2 (Praising their specific achievements and hobby)",
    "Paragraph 3 (Celebrating their kindness/growth and acknowledging their Christmas wish with wonder)",
    "Paragraph 4 (Encouraging words for Christmas Eve and warm holiday blessing)"
  ],
  "closing": "With warmest Christmas love,",
  "signature": "Santa Claus",
  "location": "The North Pole"
}`;

  // Build clean sanitized user prompt details
  const detailsParts: string[] = [
    `Child's Name: ${data.childName}`,
    `Child's Age: ${data.childAge}`,
    `Favorite Hobby/Activity: ${data.favoriteHobby}`,
    `Achievements This Year: ${data.achievements}`,
    `Christmas Gift Wish: ${data.giftWish}`,
    `Requested Tone: ${data.messageTone}`,
  ];

  if (data.favoriteInterest) {
    detailsParts.push(`Favorite Sport/Animal/Character: ${data.favoriteInterest}`);
  }
  if (data.learnedSkill) {
    detailsParts.push(`Something New Learned: ${data.learnedSkill}`);
  }
  if (data.kindAction) {
    detailsParts.push(`Kind Deed / Helpful Act: ${data.kindAction}`);
  }
  if (data.parentMessage) {
    detailsParts.push(`Special Parent Encouragement Note: ${data.parentMessage}`);
  }
  if (data.avoidMentioning) {
    detailsParts.push(`STRICT TOPICS TO AVOID (DO NOT MENTION): ${data.avoidMentioning}`);
  }

  const userPrompt = `Please write Santa's personalized letter using these details:\n\n${detailsParts.join("\n")}`;

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 1200,
    });

    const rawContent = completion.choices[0]?.message?.content;
    if (!rawContent) {
      return {
        success: false,
        error: "Santa's workshop received an empty response. Please try again.",
        code: "PROVIDER_ERROR",
      };
    }

    // Parse and validate JSON structure
    let parsed: Record<string, unknown> | null = null;
    try {
      const parsedJson: unknown = JSON.parse(rawContent);
      if (parsedJson && typeof parsedJson === "object" && !Array.isArray(parsedJson)) {
        parsed = parsedJson as Record<string, unknown>;
      }
    } catch {
      return {
        success: false,
        error: "Failed to parse Santa's letter formatting. Please try generating again.",
        code: "PARSING_ERROR",
      };
    }

    // Validate structured output schema
    if (
      !parsed ||
      typeof parsed.title !== "string" ||
      typeof parsed.greeting !== "string" ||
      !Array.isArray(parsed.body) ||
      parsed.body.length < 2 ||
      typeof parsed.closing !== "string" ||
      typeof parsed.signature !== "string" ||
      typeof parsed.location !== "string"
    ) {
      return {
        success: false,
        error: "The letter generated by Santa was missing required sections. Please try again.",
        code: "PARSING_ERROR",
      };
    }

    // Ensure all body paragraphs are non-empty strings
    const sanitizedBody = parsed.body
      .filter((p: unknown) => typeof p === "string" && p.trim().length > 0)
      .map((p: string) => p.trim());

    if (sanitizedBody.length < 2) {
      return {
        success: false,
        error: "The letter generated was too brief. Please try generating again.",
        code: "PARSING_ERROR",
      };
    }

    const letter: GeneratedSantaLetter = {
      title: parsed.title.trim(),
      greeting: parsed.greeting.trim(),
      body: sanitizedBody,
      closing: parsed.closing.trim(),
      signature: parsed.signature.trim(),
      location: parsed.location.trim(),
    };

    return {
      success: true,
      letter,
      meta: {
        modelUsed: model,
        generatedAt: new Date().toISOString(),
        product: data.productId,
      },
    };
  } catch {
    // If the external AI provider fails or encounters network/quota limits, gracefully fall back
    const letter = buildPersonalizedSantaLetter(data);
    return {
      success: true,
      letter,
      meta: {
        modelUsed: "north-pole-personalized-engine-fallback",
        generatedAt: new Date().toISOString(),
        product: data.productId,
      },
    };
  }
}
