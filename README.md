# Remix Contacts

A contact management demo application built as part of the official [Remix tutorial](https://remix.run/docs/en/main/start/tutorial). This project is intended for learning and experimentation purposes only.

## Features

- **Contact Directory** — Sidebar lists all contacts sorted by last name
- **Search** — Real-time fuzzy search by name
- **CRUD Operations** — Create, view, edit, and delete contacts
- **Favorites** — Star/unstar contacts for quick access
- **Avatar Modal** — Click a contact's photo to view it full-size
- **Dark Theme** — Dark UI with blue and gold accent colors

## Tech Stack

- **Remix** 2.x — Full-stack React framework
- **React** 18 — UI library
- **Vite** 6 — Build tool
- **TypeScript** — Type safety
- **match-sorter** — Fuzzy search/sorting

## Data

Contacts are stored in an in-memory fake database (`app/data.ts`) seeded with 40 sample contacts. Data resets on app restart.

## Project Structure

```
app/
├── root.tsx                              # App shell with sidebar layout
├── app.css                               # Global styles
├── data.ts                               # In-memory contact database
├── components/
│   └── Modal.tsx                         # Avatar enlargement modal
└── routes/
    ├── _index.tsx                        # Home page
    ├── contacts.$contactId.tsx           # Contact detail view
    ├── contacts.$contactId_.edit.tsx     # Contact edit form
    └── contacts.$contactId.destroy.tsx   # Contact delete action
public/
└── contact-photos/                       # Avatar images
```

## Development

```sh
npm run dev -- --host
```

Starts the dev server on all network interfaces.

## Production

```sh
npm run build
npm start
```

Build output goes to `build/server` and `build/client`.

## Requirements

- Node.js >= 20.0.0

## Known Security Advisories

The following `tar` vulnerabilities exist as transitive dev-only dependencies via `@remix-run/dev` → `cacache` → `tar`. They do not affect production builds and have no upstream fix available at this time.

- GHSA-83g3-92jg-28cx — Arbitrary File Read/Write via Hardlink Target Escape
- GHSA-34x7-hfp2-rc4v — Arbitrary File Creation/Overwrite via Hardlink Path Traversal
- GHSA-r6q2-hw4h-h46w — Race Condition in Path Reservations (macOS APFS)
- GHSA-8qq5-rm4j-mr97 — Arbitrary File Overwrite and Symlink Poisoning
- GHSA-67mh-4wv8-2f99 — esbuild dev server request leak (via `@remix-run/dev`, `@vanilla-extract/integration`)
- GHSA-f7f6-9jq7-3rqj — estree-util-value-to-estree prototype pollution (via `remark-mdx-frontmatter`)

## Disclaimer

This project was created as a learning exercise following the Remix tutorial. It is provided "as is" without warranty of any kind, express or implied. The in-memory data store is not suitable for production use. Use at your own risk.
