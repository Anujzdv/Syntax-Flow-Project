# SyntaxFlow — MERN Starter (Core Working Version)

A minimal full‑stack MERN app to demo quizzes and code snippets with a basic leaderboard. Authentication is purposely left unauthenticated (open endpoints) so auth can be added later.

## Stack
- Server: Node.js, Express.js, Mongoose, MongoDB
- Client: React (Create React App), React Router, Axios, Bootstrap (CDN)
- Tooling: `npm-run-all` to run client and server concurrently

## Directory
```
syntaxflow/
  server/
    controllers/
    models/
    routes/
    server.js
    seed.js
    package.json
  client/
    public/
    src/
      pages/
      components/
      services/
      App.jsx
      index.jsx
    package.json
  package.json (root)
  README.md
  SYSTEM_DESIGN.md
```

## Prerequisites
- Node.js 18+
- MongoDB (local or MongoDB Atlas)

## Environment
Create `server/.env` with your Mongo connection string:
```
MONGO_URI=mongodb://127.0.0.1:27017/syntaxflow
```

## Install
From the project root:
```
# install root tooling (npm-run-all)
npm install

# install server deps
npm --prefix server install

# install client deps
npm --prefix client install
```

## Seed the database
```
# ensure MONGO_URI is set in server/.env or the shell
npm run seed
```
This seeds sample quizzes (C, C++, Python, Java, JavaScript) and two snippets.

## Run locally (concurrently)
```
# starts server on :5000 and CRA client on :3000
npm run dev
```
- API base: `http://localhost:5000/api`
- App: `http://localhost:3000`

If you prefer running separately:
```
# terminal A
npm run server

# terminal B
npm run client
```

## Key Endpoints (no auth yet)
- Auth: `POST /api/auth/signup`, `POST /api/auth/login`
- Quizzes: `GET /api/quizzes?language=Python`, `GET /api/quizzes/:id`, `POST /api/quizzes`, `PUT /api/quizzes/:id`, `DELETE /api/quizzes/:id`
- Snippets: `GET /api/snippets?language=JavaScript`, `POST /api/snippets`, `POST /api/snippets/:id/like`
- Leaderboard: `GET /api/leaderboard`

See `SYSTEM_DESIGN.md` for full API samples and system notes.

## Deploy (short)
- DB: MongoDB Atlas (create a free cluster, whitelist IPs)
- Server: Render/railway/heroku‑like Node service. Set `MONGO_URI` env.
- Client: Vercel/Netlify. Set CRA `proxy` to your API or use env for base URL.

## Notes
- This is a learning/demo scaffold. Add authentication (JWT + cookies), input validation, rate limiting, and security headers before production.
