### SyntaxFlow — System Design (Core Working Version)

#### Component diagram & flow
- Client (React/CRA) ↔ Server (Express) ↔ MongoDB (Mongoose)
- Flow:
  1) User interacts with SPA pages (Home, Signup, Login, Quiz, Snippets, Leaderboard)
  2) Client calls REST endpoints via Axios (`/api/*`) — CRA proxy → Express
  3) Express routes → controllers → Mongoose models → MongoDB
  4) JSON responses rendered by React; Bootstrap for UI

#### Database schemas
- `User`:
  - `username: string (unique, required)`
  - `email: string (optional)`
  - `score: number (default 0)` — used for leaderboard; extend later
- `Quiz`:
  - `title: string`
  - `language: string (indexed)`
  - `questions: [{ prompt, options[string[]>=2], correctIndex:number }]`
- `Snippet`:
  - `title: string`
  - `language: string (indexed)`
  - `code: string`
  - `description: string`
  - `author: string` (default `anonymous`)
  - `likes: number (default 0)`

#### API list (core)
- Auth (open; no JWT in this version):
  - `POST /api/auth/signup` — body: `{ username, email? }` → `User`
  - `POST /api/auth/login` — body: `{ username }` → `User` or 404
- Quizzes:
  - `GET /api/quizzes?language=Python` → `Quiz[]`
  - `GET /api/quizzes/:id` → `Quiz`
  - `POST /api/quizzes` — create quiz
  - `PUT /api/quizzes/:id` — update quiz
  - `DELETE /api/quizzes/:id` — delete quiz
- Snippets:
  - `GET /api/snippets?language=JavaScript` → `Snippet[]`
  - `POST /api/snippets` — create snippet
  - `POST /api/snippets/:id/like` — increment likes
- Leaderboard:
  - `GET /api/leaderboard` — `{ users: top10 by score, snippets: top10 by likes }`

Sample request/response
```http
POST /api/snippets
Content-Type: application/json

{
  "title": "Two Sum in JS",
  "language": "JavaScript",
  "code": "function twoSum(...) { /* ... */ }"
}
```
```json
{
  "_id": "...",
  "title": "Two Sum in JS",
  "language": "JavaScript",
  "code": "function twoSum(...) { /* ... */ }",
  "likes": 0,
  "createdAt": "..."
}
```

#### Scaling notes
- Client:
  - Serve as static assets via CDN; cache aggressively
- Server (Express):
  - Stateless; horizontal scale behind load balancer; sticky sessions not required (no auth yet)
  - Use PM2/cluster or container orchestration (Kubernetes)
  - Add request rate limiting and input validation to protect resources
- Database (MongoDB):
  - Add indexes on `Quiz.language`, `Snippet.language`, and maybe `User.username`
  - Consider read replicas for heavy read endpoints (leaderboard/quizzes)
  - Use TTL/indexed archiving for old data if needed
- Caching:
  - Cache read-heavy endpoints with CDN or Redis; cache top leaderboard for short TTL

#### Security notes (to add later)
- AuthN/Z: JWT or session cookies (HttpOnly, Secure), password hashing (bcrypt)
- Input validation: celebrate/joi/zod schemas on all endpoints
- Rate limiting: express-rate-limit, slow‑down on abuse
- Headers: helmet, CORS restrictions per environment
- Logging & monitoring: morgan + structured logs, health checks, uptime

#### Deployment plan
- MongoDB Atlas: create cluster, get connection string, set `MONGO_URI` env
- Server (Render/Vercel Functions/other Node host):
  - Build step: none (plain Node) — run `node server/server.js`
  - Env: `MONGO_URI`
- Client (Vercel/Netlify):
  - Build `npm --prefix client run build`, publish `client/build`
  - Configure proxy or environment variable for API base if separate domains

#### Interview Talking Points
- Frontend:
  - Implemented SPA with React Router and Axios; responsive Bootstrap layout
  - Clean API service abstraction; simple state handling without heavy libraries
- Backend:
  - Clear MVC layering (routes → controllers → models) with Express + Mongoose
  - RESTful endpoints for quizzes, snippets, leaderboard; auth ready to extend
- Database:
  - Schemas optimized for demo with indices on query fields; seed for quick UX
  - Aggregation-lite leaderboard (likes, scores) to illustrate read patterns
- System Design:
  - Stateless horizontally scalable server; DB indexing + caching strategy
  - Clear path to production hardening: JWT, validation, rate limiting, headers
