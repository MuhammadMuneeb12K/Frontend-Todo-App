# Todo App - Frontend

A professional, production-grade frontend for a multi-user Todo Web Application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **User Authentication**: Secure signup, signin, and signout with Better Auth and JWT tokens
- **Task Management**: Full CRUD operations for tasks (create, read, update, delete, toggle completion)
- **Responsive Design**: Fully responsive across mobile (≤640px), tablet (641-1024px), and desktop (≥1025px)
- **Professional UI**: Clean, modern interface with loading states, error handling, and success feedback
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5.x (strict mode)
- **Styling**: Tailwind CSS 3.x
- **Authentication**: Better Auth with JWT
- **HTTP Client**: Axios with interceptors
- **State Management**: React Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend README)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Project Structure

```
frontend/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Public auth pages
│   ├── (dashboard)/       # Protected dashboard
│   ├── layout.tsx         # Root layout with AuthProvider
│   └── page.tsx           # Landing page with redirects
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── tasks/            # Task management components
│   └── layout/           # Layout components
├── contexts/             # React contexts
├── lib/                  # Utilities and helpers
│   ├── api/             # API client and methods
│   ├── hooks/           # Custom React hooks
│   └── utils/           # Validation and formatting
└── types/               # TypeScript type definitions
```

## Key Features

### Authentication
- Email/password signup and signin
- JWT token management with automatic refresh
- Protected routes with redirect logic
- Persistent sessions with localStorage

### Task Management
- Create tasks with title and optional description
- Edit existing tasks
- Toggle task completion status
- Delete tasks with confirmation
- Empty state for new users
- Optimistic UI updates for instant feedback

### Responsive Design
- Mobile-first approach
- Touch-friendly controls (44x44px minimum)
- Adaptive layouts for all screen sizes
- No horizontal scrolling on mobile

### Accessibility
- Keyboard navigable with visible focus indicators
- Semantic HTML elements
- ARIA attributes for dynamic content
- WCAG AA color contrast
- Screen reader friendly

## Environment Variables

- `NEXT_PUBLIC_API_URL`: Backend API base URL (default: http://localhost:8000)

## Browser Support

Modern browsers with ES6+ support:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is part of a hackathon submission.
