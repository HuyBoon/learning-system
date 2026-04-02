# LMSCore: Next-Generation Learning Management System

[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-red?logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS 4](https://img.shields.io/badge/Styling-Tailwind%204-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**LMSCore** is a high-performance, full-stack education platform designed to provide a seamless learning and teaching experience. Built with a modern tech stack centered around type-safety and scalability.

---

## 🌟 Key Features

- **🎓 Interactive Learning**: Seamless course browsing and enrollment flow.
- **👨‍🏫 Instructor Suite**: Powerful tools for course creation, content management, and student tracking.
- **🔐 Secure Auth**: JWT-based authentication with role-based access control (Student/Instructor).
- **🎨 Premium UI**: Modern, responsive design featuring glassmorphism, fluid animations (Framer Motion), and Tailwind 4.
- **⚡ Performance First**: Server-side rendering with Next.js App Router for optimal SEO and speed.

---

## 🏗️ Architecture Overview

The project is split into two main components:

### 📱 [Frontend](file:///Users/huyboon/Documents/NZT/study/IT/fullstack/learning-system/frontend/README.md) (`/frontend`)
- **Framework**: Next.js 15 (App Router)
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS 4 + Framer Motion
- **Icons**: Lucide React

### ⚙️ [Backend](file:///Users/huyboon/Documents/NZT/study/IT/fullstack/learning-system/backend/README.md) (`/backend`)
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma
- **Auth**: Passport.js + JWT

---

## 🚀 Quick Start (Docker)

The fastest way to get started is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/huyboon/learning-system.git
cd learning-system

# Start all services
docker-compose up -d
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 🛠️ Manual Development Setup

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env # Update with your DB credentials
npx prisma generate
npx prisma migrate dev
npm run start:dev
```

### 2. Frontend Setup
```bash
cd frontend
npm install
cp .env.local.example .env.local # Update API URL if needed
npm run dev
```

---

## 📄 Documentation

- [Architecture Guide](file:///Users/huyboon/Documents/NZT/study/IT/fullstack/learning-system/ARCHITECTURE.md)
- [Frontend Details](file:///Users/huyboon/Documents/NZT/study/IT/fullstack/learning-system/frontend/README.md)
- [Backend API Docs](file:///Users/huyboon/Documents/NZT/study/IT/fullstack/learning-system/backend/README.md)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) to get started.

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
