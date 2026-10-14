# Jude Rotimi — Craftudy SDE Cycle 1

Tasks API: Node · Express · Postgres · Docker · GitHub Actions · deployed on Linux.

## Run locally
```bash
cp .env.example .env
docker compose up
```

## Layout
- `src/` — the API
- `logs/` — one file per day (`YYYY-MM-DD.md`), see `logs/TEMPLATE.md`
- `dsa/` — one file per problem, approach in English first, then code
- `later.md` — ideas parked for a future cycle

## Weekly rhythm
Branch per week (`week-1`), **commit and push a log every day**, PR by Sunday 9pm.
Full walkthrough with a worked example: **[How a week works](https://adexsimply.github.io/craftudy-sde-plan/submission.html)** (always current) — local snapshot: [SUBMISSION.md](SUBMISSION.md)



## Week 3 — Tasks API

### Run the API locally

```bash
cd src
npm install
npm start
```

The API runs at `http://localhost:3000`.

### Available endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/tasks` | List all tasks |
| GET | `/tasks/:id` | Get one task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Validation and error handling

- Zod validates task input.
- Invalid input returns `400 Bad Request`.
- Missing tasks return `404 Not Found`.
- Malformed JSON returns `400 Bad Request`.
- Successful task creation returns `201 Created`.
- Successful deletion returns `204 No Content`.

### API testing

The Postman collection is stored in
`src/postman/Week3TasksCollections.json`.

**Note:** Tasks are stored in memory and reset when the server restarts.

