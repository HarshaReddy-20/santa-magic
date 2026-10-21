import { jsPDF } from "jspdf";
import { GeneratedSantaLetter } from "@/components/personalize/types";

export interface PdfLetterOptions {
  childName?: string;
  childAge?: string;
  dateStr?: string;
  stationeryTheme?: string;
}

/**
 * Sanitizes a child's name for a safe, clean PDF download filename.
 * e.g. "Timmy O'Connor!" -> "santa-letter-timmy-oconnor.pdf"
 * Fallback: "santa-letter.pdf" if name is empty or unsafe.
 */
export function sanitizePdfFileName(childName?: string): string {
  if (!childName || typeof childName !== "string") {
    return "santa-letter.pdf";
  }

  const cleaned = childName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // strip accents
    .toLowerCase()
    .replace(/['"`]/g, "") // strip quotes and apostrophes
    .replace(/[^a-z0-9_-]+/g, "-") // convert spaces & special characters to single hyphens
    .replace(/^-+|-+$/g, ""); // trim leading/trailing hyphens

  return cleaned.length > 0 ? `santa-letter-${cleaned}.pdf` : "santa-letter.pdf";
}

/**
 * Draws the high-fidelity festive page backgrounds, borders, and footer watermarks.
 */
function drawPageDecorations(doc: jsPDF): void {
  // 1. Soft Warm Parchment Fill
  doc.setFillColor(254, 252, 246);
  doc.rect(0, 0, 210, 297, "F");

  // 2. Outer Festive Gold Border
  doc.setDrawColor(205, 160, 42); // #CDA02A
  doc.setLineWidth(1.2);
  doc.rect(10, 10, 190, 277, "S");

  // 3. Inner Deep Crimson Border
  doc.setDrawColor(136, 19, 19); // #881313
  doc.setLineWidth(0.4);
  doc.rect(13, 13, 184, 271, "S");

  // 4. Corner Ornaments (Golden diamonds at the 4 corners)
  const corners = [
    { x: 11.5, y: 11.5 },
    { x: 198.5, y: 11.5 },
    { x: 11.5, y: 285.5 },
    { x: 198.5, y: 285.5 },
  ];
  doc.setFillColor(205, 160, 42);
  corners.forEach((c) => {
    doc.rect(c.x - 1, c.y - 1, 2, 2, "F");
  });

  // 5. Official North Pole Running Bottom Seal
  doc.setFont("times", "italic");
  doc.setFontSize(8);
  doc.setTextColor(136, 19, 19);
  doc.text(
    "Official Keepsake from Santa's Magic • North Pole Postal Service Archive",
    105,
    289,
    { align: "center" }
  );
}

/**
 * Builds a vector-rendered, multi-page capable, print-ready PDF for Santa's letter.
 */
export function createSantaLetterPdf(
  letter: GeneratedSantaLetter,
  options?: PdfLetterOptions
): jsPDF {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const childName = options?.childName?.trim() || "";
  const childAge = options?.childAge?.trim() || "";
  const dateStr = options?.dateStr || "Christmas Eve 2026";

  // Draw Page 1 borders & background
  drawPageDecorations(doc);

  // --- HEADER / NORTH POLE LETTERHEAD ---
  doc.setFont("times", "bold");
  doc.setFontSize(16);
  doc.setTextColor(136, 19, 19);
  doc.text("NORTH POLE POSTAL SERVICE", 105, 25, { align: "center" });

  doc.setFont("times", "italic");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 75, 25);
  doc.text(
    "OFFICIAL SANTA CLAUS DISPATCH • ARCTIC CIRCLE 99705",
    105,
    30,
    { align: "center" }
  );

  // --- POSTMARK & CERTIFICATION BADGES ---
  // Left Badge: Official Air Mail Postmark
  doc.setFillColor(245, 237, 218);
  doc.rect(22, 35, 62, 13, "F");
  doc.setDrawColor(136, 19, 19);
  doc.setLineWidth(0.3);
  doc.rect(22, 35, 62, 13, "S");

  doc.setFont("times", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(136, 19, 19);
  doc.text("AIR MAIL • SPECIAL DELIVERY", 53, 40.5, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(100, 75, 25);
  doc.text("North Pole Mail Dept • Nice List Approved", 53, 44.5, { align: "center" });

  // Right Badge: Dispatched Date & Status
  doc.setFillColor(245, 237, 218);
  doc.rect(126, 35, 62, 13, "F");
  doc.setDrawColor(205, 160, 42);
  doc.rect(126, 35, 62, 13, "S");

  doc.setFont("times", "bold");
  doc.setFontSize(7.5);
  doc.setTextColor(136, 19, 19);
  doc.text(`DISPATCHED: ${dateStr}`, 157, 40.5, { align: "center" });

  doc.setFont("times", "normal");
  doc.setFontSize(6.5);
  doc.setTextColor(28, 91, 60);
  doc.text("STATUS: Official Nice List Certified", 157, 44.5, { align: "center" });

  // Gold Divider Line with Star
  doc.setDrawColor(205, 160, 42);
  doc.setLineWidth(0.5);
  doc.line(22, 51, 188, 51);

  doc.setFont("times", "bold");
  doc.setFontSize(9);
  doc.setTextColor(136, 19, 19);
  doc.text("* * *", 105, 50.5, { align: "center" });

  // Recipient Metadata Banner
  if (childName) {
    doc.setFillColor(247, 241, 226);
    doc.rect(22, 54, 166, 8, "F");
    doc.setFont("times", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(136, 19, 19);
    const ageSuffix = childAge ? ` (${childAge})` : "";
    doc.text(
      `RECIPIENT: ${childName.toUpperCase()}${ageSuffix}   •   DISPATCHED FROM THE NORTH POLE`,
      105,
      59.5,
      { align: "center" }
    );
  }

  // --- LETTER CONTENT RENDERING ---
  let currentY = childName ? 71 : 62;
  const maxY = 250;
  const contentWidth = 166;

  // Personalized Greeting
  doc.setFont("times", "bolditalic");
  doc.setFontSize(13);
  doc.setTextColor(136, 19, 19);
  doc.text(letter.greeting, 22, currentY);
  currentY += 8;

  // Body Paragraphs with Multi-Page Wrapping
  doc.setFont("times", "normal");
  doc.setFontSize(10.5);
  doc.setTextColor(38, 23, 13);

  const paragraphs = Array.isArray(letter.body) ? letter.body : [String(letter.body)];

  for (const para of paragraphs) {
    if (!para || typeof para !== "string") continue;
    const lines = doc.splitTextToSize(para, contentWidth);

    for (const line of lines) {
      if (currentY + 6 > maxY) {
        doc.addPage();
        drawPageDecorations(doc);

        doc.setFont("times", "italic");
        doc.setFontSize(9);
        doc.setTextColor(136, 19, 19);
        doc.text("North Pole Postal Service — Santa's Letter (Continued)", 105, 23, {
          align: "center",
        });

        currentY = 32;
        doc.setFont("times", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(38, 23, 13);
      }

      doc.text(line, 22, currentY);
      currentY += 5.6;
    }
    currentY += 4; // Gap between paragraphs
  }

  // --- CLOSING & SANTA SIGNATURE AREA ---
  // Ensure enough room for Closing + Signature + Wax Seal (approx 35mm)
  if (currentY + 35 > maxY) {
    doc.addPage();
    drawPageDecorations(doc);

    doc.setFont("times", "italic");
    doc.setFontSize(9);
    doc.setTextColor(136, 19, 19);
    doc.text("North Pole Postal Service — Santa's Letter (Continued)", 105, 23, {
      align: "center",
    });

    currentY = 32;
  }

  // Closing
  doc.setFont("times", "italic");
  doc.setFontSize(11);
  doc.setTextColor(90, 66, 32);
  doc.text(letter.closing, 22, currentY);
  currentY += 8;

  // Signature
  doc.setFont("times", "bolditalic");
  doc.setFontSize(18);
  doc.setTextColor(136, 19, 19);
  doc.text(letter.signature, 22, currentY + 3);

  // Workshop Location
  doc.setFont("times", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(100, 75, 25);
  doc.text(letter.location, 22, currentY + 11);

  // Red Wax Seal Graphic (Vector drawing on right)
  const sealCenterX = 162;
  const sealCenterY = currentY + 4;

  doc.setFillColor(136, 19, 19);
  doc.circle(sealCenterX, sealCenterY, 12, "F");

  doc.setDrawColor(205, 160, 42);
  doc.setLineWidth(0.6);
  doc.circle(sealCenterX, sealCenterY, 10.5, "S");

  doc.setFont("times", "bold");
  doc.setFontSize(6.5);
  doc.setTextColor(250, 224, 146);
  doc.text("NORTH POLE", sealCenterX, sealCenterY - 1.5, { align: "center" });

  doc.setFontSize(5.5);
  doc.text("APPROVED", sealCenterX, sealCenterY + 1.5, { align: "center" });

  doc.setFontSize(4.5);
  doc.text("NICE LIST SEAL", sealCenterX, sealCenterY + 4.5, { align: "center" });

  // Multi-Page Numbering if total pages > 1
  const totalPages = doc.getNumberOfPages();
  if (totalPages > 1) {
    for (let p = 1; p <= totalPages; p++) {
      doc.setPage(p);
      doc.setFont("times", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 75, 25);
      doc.text(`Page ${p} of ${totalPages}`, 188, 282, { align: "right" });
    }
  }

  return doc;
}

/**
 * Generates and triggers downloading of the actual Santa Letter PDF file in the browser.
 */
export async function downloadSantaLetterPdf(
  letter: GeneratedSantaLetter,
  options?: PdfLetterOptions
): Promise<{ success: boolean; fileName: string; error?: string }> {
  const fileName = sanitizePdfFileName(options?.childName);

  try {
    const doc = createSantaLetterPdf(letter, options);

    if (typeof window !== "undefined") {
      doc.save(fileName);
    }

    return {
      success: true,
      fileName,
    };
  } catch (error: unknown) {
    const err = error as Error | undefined;
    const errorMsg = err?.message || "Failed to generate or download Santa's letter PDF.";
    return {
      success: false,
      fileName,
      error: errorMsg,
    };
  }
}
