# FlagQuest 🌎

**Learn the World. Test Your Knowledge.**

FlagQuest is a responsive educational web app for exploring countries and identifying world flags through multiple-choice quizzes.

## Current MVP

- Interactive Home page
- Desktop top navigation + mobile bottom navigation
- Learn section with country cards
- Country detail pages
- Flag, capital, region, population, currency and language facts when available
- 10-question flag quiz
- Four randomized answer choices
- Correct answer is never shown before the user answers
- Immediate correct/incorrect feedback
- Score and percentage result screen
- REST Countries API integration with a local fallback dataset
- Responsive UI foundation

## Tech stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS v4
- Lucide React
- REST Countries API
- FlagCDN fallback assets

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

- `app/page.tsx` — Home
- `app/quiz/page.tsx` — Quiz
- `app/learn/page.tsx` — Country explorer
- `app/learn/[code]/page.tsx` — Country details
- `app/navigation.tsx` — responsive navigation
- `lib/countries.ts` — country types, API loader and fallback data
- `app/globals.css` — design system and responsive styles

## Important quiz rule

The quiz does **not** display the country name alongside the flag before the answer is selected. The correct country is revealed only after an answer is submitted.

## Next improvements

- Client-side search/filter controls on Learn
- More quiz modes and difficulty levels
- Persistent progress/streaks
- Daily quiz
- Achievements and leaderboard
- User accounts
- Expanded country facts
- Automated CI/build checks
