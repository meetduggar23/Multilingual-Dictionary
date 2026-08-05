# Multilingual Dictionary

An AI-powered multilingual dictionary with translation, pronunciation, quizzes, and daily words.

> Free APIs used by this dictionary repo:

| Feature | API | Official Link |
| --- | --- | --- |
| 📖 Dictionary (Definitions, Pronunciation, Examples, Phonetics) | Free Dictionary API | https://dictionaryapi.dev/ |
| 🌍 Translation | LibreTranslate | https://libretranslate.com/ |
| 🔤 Synonyms & Antonyms | Datamuse API | https://www.datamuse.com/api/ |
| 🌐 Language Detection | Detect Language API | https://detectlanguage.com/documentation |
| 📝 Word Definitions & Thesaurus | WordsAPI (API key required) | https://www.wordsapi.com/ |
| 📚 English Dictionary (Oxford-based) | Oxford Dictionaries API (API key required) | https://developer.oxforddictionaries.com/ |
| 🎙 Pronunciation Audio | Free Dictionary API | https://dictionaryapi.dev/ |

## Features

- Search words with definitions, synonyms, and examples
- AI assistant for word explanations
- Multilingual translation
- Text-to-speech pronunciation
- Word quizzes
- Favorites and search history
- Daily word of the day
- Auth (register/login with JWT) and per-user favorites, history & analytics

## Tech Stack

- Frontend: React + TypeScript + Vite + Tailwind CSS
- Backend: Node.js + Express + Prisma
- Database: PostgreSQL

## Project Structure

- `client/` — Vite + React frontend
- `server/` — Express API (auth, dictionary proxy, favorites, history, quiz, analytics)
- `shared/` — shared types and constants

## Getting Started

Prerequisites: Node.js >= 20, npm, and PostgreSQL (or Docker).

1. Install dependencies: `npm install`
2. Copy `.env.example` to `.env` and fill in your values:
   - Windows PowerShell: `Copy-Item .env.example .env`
   - macOS/Linux: `cp .env.example .env`
3. Start PostgreSQL:
   - With Docker: `docker compose up -d postgres`
   - Or point `DATABASE_URL` at an existing Postgres instance
4. Create the database schema and seed a demo user:
   - `npm run db:migrate`
   - `npm run db:seed` (creates `demo@dictionary.ai` / `demo1234`)
5. Run the app (server + client together): `npm run dev`

Then open http://localhost:5173 (client) — the API runs at http://localhost:5000/api.

### Running pieces separately

- Client only: `npm run dev:client`
- Server only: `npm run dev:server`
- Production build: `npm run build`
- Typecheck all workspaces: `npm run typecheck`

## Environment Variables

See `.env.example` for the required environment variables. Third-party keys
(`DICTIONARY_API_URL`, `DATAMUSE_API_URL`, `LIBRETRANSLATE_API_URL`) are optional —
the server falls back to free public endpoints, and a small offline translation
dictionary keeps single-word translations working without network access.
