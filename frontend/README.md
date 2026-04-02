# 📱 LMSCore Frontend: Premium Education Platform

[![Next.js 15](https://img.shields.io/badge/Next.js%2015-black?logo=next.js)](https://nextjs.org/)
[![Tailwind 4](https://img.shields.io/badge/Tailwind%204-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux-Toolkit-764ABC?logo=redux)](https://redux-toolkit.js.org/)

The **LMSCore Frontend** is a modern, high-performance web application designed for a premium user experience. Built with Next.js 15, it leverages server-side rendering, type-safety, and fluid animations to provide a top-tier educational interface.

---

## 🎨 Design Philosophy

- **Premium Aesthetics**: Clean, modern design with a focused color palette (Indigo, Slate).
- **Glassmorphism**: Subtle backdrops and blurs for a "layered" feel.
- **Micro-interactions**: Framer Motion powered transitions for buttons, forms, and page changes.
- **Accessibility**: Semantic HTML and keyboard-friendly navigation.

---

## 🛠️ Technology Stack

| Feature | Technology |
| :--- | :--- |
| **Framework** | Next.js 15 (App Router) |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **State Management** | Redux Toolkit |
| **Forms/Validation** | Native React Hooks |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |
| **Notifications** | React Hot Toast |

---

## 📁 Project Structure

```text
src/
├── app/               # Next.js App Router (pages and layouts)
│   ├── (auth)/        # Authentication routes (Login, Register)
│   └── (dashboard)/   # Student/Instructor dashboard (TBD)
├── components/        # Reusable UI components
│   ├── auth/          # Authentication specific components
│   ├── layout/        # Global layout elements (Nav, Footer)
│   ├── ui/            # Base UI primitives (Buttons, Inputs)
│   └── providers/     # React Context/Provider wrappers
├── store/             # Redux state management (slices, hooks)
├── lib/               # Utility functions, API config, helpers
├── types/             # TypeScript interfaces and types
└── public/            # Static assets (images, icons)
```

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 3. Start Development
```bash
npm run dev
```

---

## 🏗️ Core Features

- **Split-screen Auth**: Visually immersive Login/Register experience.
- **Role-based Views**: Tailored dashboards for Students and Instructors.
- **Dynamic Content**: Instant UI updates via Redux.
- **Optimized Assets**: Next.js 15 Image optimization for speed.

---

## 🤝 Contributing

Contributions are welcome! Please check our root `CONTRIBUTING.md`.
