# Blog

This repository contains a small blog application built with Next.js and TypeScript. It lets you
publish markdown posts backed by a SQLite database, with caching for faster reads, and manage them
through a lightweight admin panel.

## What the app does

The public site shows a list of posts and individual post pages with formatted markdown and creation
dates. The admin area, protected by JWT‑based authentication, lets you create, edit, and delete
posts using a markdown editor and a clean, responsive UI.

## Tech stack

- **Framework**: Next.js App Router with React and TypeScript
- **Styling**: Tailwind CSS and typography utilities
- **Database**: SQLite managed through Drizzle ORM and drizzle‑kit migrations
- **Validation**: Zod for schema validation and runtime safety
- **Markdown**: `react-markdown`, `remark-gfm`, `rehype-sanitize`, and `sanitize-html` for safe
  markdown rendering
- **Auth**: `jose` for JWTs, `bcrypt` for password hashing, and HTTP‑only cookies for session
  management

## Configuration

To configure the project, copy `.env.example` to `.env` and adjust the values. At minimum you should
set `DATABASE_URL` to the path of your SQLite file, choose a strong random `AUTH_JWT_SECRET`, and
define `ADMIN_USERNAME` and `ADMIN_PASSWORD` (the password must be base64‑encoded); you can enable
or disable login with `AUTH_ENABLED`.

## Running locally

You can use any JavaScript package manager you prefer; the examples below use Bun.

First install the dependencies:

```bash
bun install
```

Then generate and apply database migrations:

```bash
bun run db:generate
bun run db:migrate
```

Optionally seed example posts:

```bash
bun run db:seed
```

Finally, start the development server and open `http://localhost:3000` in your browser:

```bash
bun run dev
```

The home page shows the list of published posts, while the admin interface is available under
`/admin` where you can sign in with the credentials configured in your `.env` file.

## URLs

In development the base URL is `http://localhost:3000`. Main routes:

- `/` — posts list (home)
- `/posts/[slug]` — individual post
- `/admin` — admin dashboard
- `/admin/login` — admin login
