# FlagQuest — Product Specification

## Product goal

Build a polished, responsive educational web app for learning about countries and testing world-flag knowledge.

## Primary navigation

There are exactly three primary sections:

- Home
- Quiz
- Learn

On mobile, use a fixed bottom navigation bar. On desktop, use a traditional header navigation.

## Home

The homepage should explain the product clearly and provide:

- Hero section
- Start Quiz CTA
- Explore Countries CTA
- Feature cards for exploration, flag identification, learning, and progress
- Quick actions including Random Country

Suggested headline: **How Well Do You Know the World?**

## Quiz

This is the core game experience.

### Anti-reveal rule

Before the user answers a question, do not show:

- The country name
- A country card containing the answer
- A pre-highlighted correct option
- Any visible filename/label that exposes the answer

The user should see only a flag and a question such as:

> Which country does this flag belong to?

Each question has four choices: one correct country and three different incorrect countries. Shuffle the choices and randomize the correct choice position.

### Quiz structure

Each question contains:

1. Question number
2. Progress indicator
3. Flag
4. Question text
5. Four answer choices
6. Feedback after selection
7. Next Question control

Reveal the correct country only after the user submits an answer.

### Modes

- Random Flags
- Country Quiz
- Quick Quiz — 5 questions
- Standard Quiz — 10 questions

### Results

Show:

- Final score
- Correct count
- Incorrect count
- Percentage
- Performance message
- Try Again
- Back to Quiz
- Explore Countries

## Learn

The Learn section is for free country exploration, separate from the quiz.

Provide:

- Search by country name
- Country-code search where supported
- Region filters: All, Asia, Europe, Africa, North America, South America, Oceania
- Responsive country cards

Country cards should include:

- Flag
- Country name
- Region/continent
- Optional capital

## Country details

Route example: `/learn/bangladesh`

Show a large flag, country name, and structured information cards. Only show information that is reliably available from the selected data source.

Possible fields:

- Country name
- Official name
- Capital
- Region
- Continent
- Population
- Currency
- Languages
- Country code
- Calling code
- Time zone
- Area

Add a **Test Yourself** CTA without revealing the quiz answer ahead of time.

## Data

Use a comprehensive country dataset rather than a hand-entered list of only a few example countries. Prefer reliable structured data and SVG flags.

Suggested model:

```ts
type Country = {
  id: string;
  name: string;
  officialName?: string;
  flag: string;
  capital?: string;
  region?: string;
  continent?: string;
  population?: number;
  currency?: string;
  languages?: string[];
  code?: string;
};
```

The data model can be improved when justified.

## Technology

Preferred implementation:

- Next.js with App Router
- TypeScript
- Tailwind CSS
- React
- Lucide React
- Local state for quiz sessions
- localStorage when persistence is useful
- No unnecessary backend/database in the initial MVP

Prioritize performance, accessibility, mobile responsiveness, maintainability, SEO, and type safety.

## Component architecture

Suggested organization:

```text
components/
  layout/
  navigation/
  home/
  quiz/
  country/
  ui/

data/
  countries.ts

lib/
  quiz.ts
  countries.ts

app/
  page.tsx
  quiz/
  learn/
  learn/[country]/
```

Keep components modular and reusable.

## Design

Use a modern educational visual language: clean, minimal, friendly, interactive, professional, slightly playful.

Avoid excessive gradients, shadows, colors, clutter, and animation.

## Accessibility

Use semantic HTML, keyboard navigation, visible focus states, accessible controls, good contrast, correct alt text, and feedback that does not rely on color alone.

## SEO

Use meaningful titles, descriptions, Open Graph metadata, semantic routes, and country-specific metadata.

Example: `Bangladesh — Flag, Capital & Country Facts | FlagQuest`

## Responsive behavior

Mobile-first. On mobile use large touch targets, stacked answer options, readable flags, no horizontal scrolling, responsive country cards, and bottom navigation. On desktop use wider layouts, country grids, traditional top navigation, and a larger quiz presentation.

## Quality gates

Before considering the MVP complete, verify:

- Home works
- Quiz works
- Country name stays hidden before an answer
- Four choices work
- Choice order is randomized
- Correct/incorrect feedback works
- Score calculation is correct
- Learn list works
- Search works
- Region filtering works
- Country details work
- Mobile bottom navigation works
- Desktop navigation works
- No major runtime or console errors remain

## Future-ready capabilities

Structure the code so later versions can add:

- More quiz types
- Progress tracking
- Accounts
- Leaderboards
- Achievements
- Daily quizzes
- Streaks
- Difficulty levels
- Multiple languages
