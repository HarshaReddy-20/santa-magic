export type ProductId = "letter" | "video" | "bundle" | "greeting";

export interface ProductItem {
  id: ProductId;
  title: string;
  description: string;
  priceText: string;
  badge?: string;
  includesLetter: boolean;
  includesVideo: boolean;
  iconName: "mail" | "video" | "gift" | "sparkles";
}

export const PRODUCTS: ProductItem[] = [
  {
    id: "letter",
    title: "Personalized Santa Letter",
    description:
      "A heartfelt letter from Santa on official North Pole stationery, customized with your child's name, hobbies, and achievements.",
    priceText: "Price coming soon",
    badge: "Keepsake Stationery",
    includesLetter: true,
    includesVideo: false,
    iconName: "mail",
  },
  {
    id: "video",
    title: "Personalized Santa Video",
    description:
      "A magical high-definition video where Santa delivers an encouraging personalized message directly from his fireside.",
    priceText: "Price coming soon",
    badge: "Cinematic Experience",
    includesLetter: false,
    includesVideo: true,
    iconName: "video",
  },
  {
    id: "bundle",
    title: "Letter + Video Bundle",
    description:
      "The complete North Pole experience combining both the physical keepsake letter and the cinematic personalized video.",
    priceText: "Price coming soon",
    badge: "Most Magical Package",
    includesLetter: true,
    includesVideo: true,
    iconName: "gift",
  },
  {
    id: "greeting",
    title: "Santa Christmas Greeting Video",
    description:
      "A joyful and festive holiday greeting video from Santa to bring a quick spark of Christmas wonder.",
    priceText: "Price coming soon",
    badge: "Festive Quick Greeting",
    includesLetter: false,
    includesVideo: true,
    iconName: "sparkles",
  },
];

export interface PersonalizationData {
  productId: ProductId;
  // Step 2: Child's Details
  childName: string;
  childAge: string;
  pronunciationGuide: string;
  // Step 3: Hobbies & Achievements
  favoriteHobby: string;
  favoriteInterest: string; // sport, animal, or character
  achievements: string;
  learnedSkill: string;
  kindAction: string;
  // Step 4: Christmas Wishes
  giftWish: string;
  parentMessage: string;
  avoidMentioning: string;
  // Step 5: Preferences
  santaScene: "tree" | "fireplace" | "workshop";
  messageTone: "magical" | "playful" | "traditional";
  stationeryTheme: "airmail" | "holly" | "goldfoil";
  letterGreetingStyle: "workshop" | "official" | "fireside";
  language: "en";
  // Step 6: Confirmation
  guardianConfirmed: boolean;
}

export const INITIAL_FORM_DATA: PersonalizationData = {
  productId: "letter",
  childName: "",
  childAge: "",
  pronunciationGuide: "",
  favoriteHobby: "",
  favoriteInterest: "",
  achievements: "",
  learnedSkill: "",
  kindAction: "",
  giftWish: "",
  parentMessage: "",
  avoidMentioning: "",
  santaScene: "fireplace",
  messageTone: "magical",
  stationeryTheme: "airmail",
  letterGreetingStyle: "workshop",
  language: "en",
  guardianConfirmed: false,
};

export const AGE_OPTIONS = [
  "Under 1 year old",
  "1 year old",
  "2 years old",
  "3 years old",
  "4 years old",
  "5 years old",
  "6 years old",
  "7 years old",
  "8 years old",
  "9 years old",
  "10 years old",
  "11 years old",
  "12+ years old",
];

export const SCENE_OPTIONS = [
  {
    id: "tree",
    title: "Decorated Christmas Tree",
    description: "Santa seated beside a grand, twinkling evergreen tree adorned with ornaments and lights.",
    icon: "tree",
  },
  {
    id: "fireplace",
    title: "Cozy Fireplace",
    description: "Santa seated in his cozy velvet armchair by the warm brick hearth and crackling fire.",
    icon: "fireplace",
  },
  {
    id: "workshop",
    title: "North Pole Workshop",
    description: "Santa at his bustling workshop desk with toys, scrolls, and festive wooden shelves.",
    icon: "workshop",
  },
] as const;

export const TONE_OPTIONS = [
  {
    id: "magical",
    title: "Magical and Heartwarming",
    description: "Gentle, inspiring tone focused on love, holiday wonder, and kindness.",
  },
  {
    id: "playful",
    title: "Funny and Playful",
    description: "Jolly laughs, playful elf humor, reindeer jokes, and festive giggles.",
  },
  {
    id: "traditional",
    title: "Traditional Santa",
    description: "Classic Ho-Ho-Ho warmth, nostalgic North Pole charm, and timeless reassurance.",
  },
] as const;

export const STATIONERY_OPTIONS = [
  {
    id: "airmail",
    title: "Official North Pole Air Mail",
    description: "Traditional red-and-green candy cane border, official postal stamp, and wax seal motif.",
  },
  {
    id: "holly",
    title: "Vintage Holly & Ivy Parchment",
    description: "Antique ivory parchment paper with delicate holly leaves and pinecone corner flourishes.",
  },
  {
    id: "goldfoil",
    title: "Snowflake Gold Foil Keepsake",
    description: "Winter twilight emerald stationery with metallic gold filigree and starry snowflake borders.",
  },
] as const;

export const GREETING_STYLE_OPTIONS = [
  {
    id: "workshop",
    title: "Warm Workshop Hearth Opening",
    description: "'Ho, ho, ho! Warm greetings from my snowy North Pole workshop...'",
  },
  {
    id: "official",
    title: "Official Good Deeds Decree",
    description: "'By special order of the North Pole Nice List Committee...'",
  },
  {
    id: "fireside",
    title: "Gentle Fireside Note",
    description: "'As the snow falls softly across the North Pole tonight, I am writing to you...'",
  },
] as const;

export interface GeneratedSantaLetter {
  title: string;
  greeting: string;
  body: string[];
  closing: string;
  signature: string;
  location: string;
}

export interface GenerateLetterSuccessResponse {
  success: true;
  letter: GeneratedSantaLetter;
  meta: {
    modelUsed: string;
    generatedAt: string;
    product: ProductId;
  };
}

export interface GenerateLetterErrorResponse {
  success: false;
  error: string;
  code:
    | "MISSING_API_KEY"
    | "INVALID_INPUT"
    | "PRODUCT_NOT_SUPPORTED"
    | "RATE_LIMITED"
    | "PROVIDER_ERROR"
    | "PARSING_ERROR";
}

export type GenerateLetterResponse =
  | GenerateLetterSuccessResponse
  | GenerateLetterErrorResponse;
