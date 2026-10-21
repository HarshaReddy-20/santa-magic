# Santa's Magic 🎅✨

Personalized letters and magical videos from Santa Claus for children and families.

## Features Implemented
- **Task 1: Festive Homepage** (`/`) — Premium holiday design, navigation, product showcases, sample letter stationery preview, benefits, and FAQ.
- **Task 2: Customer Personalization Form** (`/personalize`) — 6-step accessible customization form collecting child's details, hobbies, achievements, wishes, and stationery/scene preferences in secure session memory.
- **Task 3: AI-Powered Santa Letter Generation** (`/letter` & `POST /api/generate-letter`) — Server-side AI generation powered by the official OpenAI SDK, crafting structured, personalized North Pole letters.

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ installed

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration (OpenAI API Key)
AI letter generation requires an OpenAI API key.

1. Copy the example environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` and add your secret OpenAI API key:
   ```env
   OPENAI_API_KEY=sk-your-actual-openai-api-key-here
   OPENAI_MODEL=gpt-4o-mini
   ```
   *(Never commit `.env.local` or expose your API key in source control).*

> **Note on Missing Key:** If no API key is provided, the application will display a clear development setup notice rather than silently failing or fabricating fake results.

### 4. Run the Development Server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Testing Letter Generation

1. Navigate to [http://localhost:3000/personalize](http://localhost:3000/personalize).
2. Choose **Personalized Santa Letter** or **Letter + Video Bundle**.
3. Fill out the child's details, hobbies, achievements, and Christmas wish.
4. Review your details and click **Confirm Details**.
5. Click **Generate Santa's Letter** to navigate to `/letter`.
6. Watch Santa draft the letter and view the official North Pole keepsake stationery preview.
7. Click **Generate Again (Rewrite)** to request a fresh revision.

---

## Verification Commands
```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```
