# Medkit API

Independent Express/MongoDB API for Medkit. The current frontend remains mock-data driven; this service is ready for later integration.

## Setup

1. Copy `.env.example` to `.env` and replace every placeholder. Create an Atlas database user and allow your development IP in Atlas Network Access.
2. Run `npm install` inside `backend`.
3. Run `npm run dev` for local development, or `npm start` for production.

Useful commands: `npm test` runs the in-memory MongoDB integration suite; `npm run seed:check` validates the starter catalog source.

## Authentication

`POST /api/auth/register` accepts `{ name, email, password }`; `POST /api/auth/login` accepts `{ email, password }`. Both return `{ user, accessToken, refreshToken, expiresAt }` and register clones the three starter medicines into the account.

Use protected routes with `Authorization: Bearer <accessToken>`. Send `{ refreshToken }` to `POST /api/auth/refresh` to rotate the token pair, and to `POST /api/auth/logout` to revoke that session. `GET /api/auth/profile` returns the authenticated user.

## Resources

| Resource | Endpoints |
| --- | --- |
| Health | `GET /api/health` |
| Medicines | authenticated `GET`, `POST /api/medicines`; `GET`, `PUT`, `DELETE /api/medicines/:id` |
| Reminders | authenticated `GET`, `POST /api/reminders`; `GET`, `PUT`, `DELETE /api/reminders/:id` |
| Emergency contacts | authenticated `GET`, `POST /api/emergency`; `DELETE /api/emergency/:id` |

Medicine fields are `name`, `category`, `price`, `dosage`, `usefulness`, `description`, and `image`. Reminders require `medicineName` and `time` (`HH:mm`); optional fields are `medicineId`, ISO `date`, `repeat` (`none`, `daily`, `weekly`), and `status` (`pending`, `taken`). Emergency contacts require `name` and `phone`, with optional `relation`.

All errors use `{ message, errors? }`. Resource responses are user-scoped; IDs belonging to another account return `404`.

## Deployment

Deploy the `backend` directory as a Render Node service with build command `npm install` and start command `npm start`. Configure the same environment variables in Render, set `MONGODB_URI` to the Atlas connection string, set `CLIENT_ORIGIN` to the deployed frontend URL, and allow Render's network access in Atlas.
