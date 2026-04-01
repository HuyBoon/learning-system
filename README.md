# Learning Management System (LMS)

A full-stack education platform built with Next.js, NestJS, and Prisma.

## Project Structure

- `frontend/`: Next.js application with Tailwind CSS and Redux Toolkit.
- `backend/`: NestJS API with Prisma ORM and PostgreSQL (Supabase).

## Prerequisites

- Node.js (v20+)
- npm or yarn
- A PostgreSQL database (e.g., Supabase)

## Getting Started

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:
```env
DATABASE_URL="your-postgresql-url"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="24h"
PORT=5001
```

Generate Prisma client:
```bash
npx prisma generate
```

Run migrations:
```bash
npx prisma migrate dev
```

Start the backend:
```bash
npm start
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the `frontend/` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

Start the frontend:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Features

- User Authentication (JWT)
- Course Browsing and Enrollment
- Instructor Dashboard (Course Management)
- Responsive Design with Tailwind CSS
