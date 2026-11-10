# BookNook Frontend

BookNook is a small online library built with Next.js. Readers can browse books, add titles, borrow copies, track their borrows, and return books.

## Features

- Editorial BookNook design with responsive layouts and light/dark themes.
- System theme mode by default with a header theme toggle.
- Sticky responsive header with:
  - Book browsing navigation
  - Search shortcut
  - Authenticated account menu
  - Full-height mobile navigation
- Full-width home hero slider built with Swiper:
  - Three slides
  - Background images and overlays
  - Autoplay, pagination, and keyboard navigation
  - Browse Books links
- Featured books section backed by the books API.
- Book collection page at `/books`.
- Book search page at `/search`, searching by title, author, or category.
- Book details page at `/book/[id]`.
- Authenticated add-book page at `/add`.
- Owner book collection at `/my-books`.
- Borrow history at `/my-borrows` with:
  - Book detail enrichment
  - Cover images
  - Grouped quantities
  - Partial and full returns
  - Return success and error toasts
- Account dashboard at `/account`.
- Owner-only edit and delete controls on book details.
- Email/password and GitHub authentication using Better Auth.
- Toast notifications for authentication, borrowing, returning, and errors.
- Shadcn-style dialogs, alert dialogs, dropdowns, avatars, buttons, and skeleton loading states.
- Route-level loading skeletons for all application pages.
- Two additional home sections:
  - How borrowing works
  - BookNook feature shortcuts

## Routes

| Route | Purpose | Access |
| --- | --- | --- |
| `/` | Home, hero slider, featured books, and library sections | Public |
| `/books` | Browse the complete collection | Public |
| `/search` | Search the public book collection | Public |
| `/book/[id]` | View a book and available actions | Signed-in API access |
| `/login` | Email/password or GitHub login | Public |
| `/signup` | Create an account | Public |
| `/account` | Profile and BookNook shortcuts | Signed-in |
| `/add` | Add a book to the library | Signed-in |
| `/my-books` | Manage books added by the current user | Signed-in |
| `/my-borrows` | View and return borrowed books | Signed-in |

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- MongoDB-backed backend API
- Swiper.js
- Motion
- Radix UI and Base UI primitives
- Lucide icons

## Getting Started

From the `frontend` directory:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create `frontend/.env`:

```env
BETTER_AUTH_SECRET=replace-with-a-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:5000
DATABASE_URL=your-mongodb-connection-string
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Do not commit real secrets. Configure production values in the hosting provider.

## Scripts

```bash
npm run dev
npm run lint
npm run build
npm run start
```

The backend API must be running and `NEXT_PUBLIC_API_URL` must point to it.

## Deployment

Deploy the frontend as a Next.js project. Set the project root to `frontend` and configure all required environment variables, especially:

```env
BETTER_AUTH_URL=https://your-frontend-domain
NEXT_PUBLIC_API_URL=https://your-backend-domain
```

