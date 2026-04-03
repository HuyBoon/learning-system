# HuyBoon Academy - Full-Stack E-Learning Platform

A robust, modern learning management system (LMS) designed for instructors and students. Features include multi-media lessons, material management, secure authentication, and a comprehensive admin dashboard.

## 🚀 Features

### **Instructor & Lesson Management**
- **Polymorphic Lesson Types**:
  - **VIDEO**: High-definition video streaming.
  - **ARTICLE**: Rich-text content with embedded images.
  - **MIXED**: Combined video and text for a complete learning experience.
- **Materials System**: Attach resources like PDF, ZIP, CODE, and documents to lessons.
- **Secure Handling**: Backend-proxied uploads to Cloudinary ensure security and ownership control.

### **Student Interaction**
- **Interactive Player**: Smooth transition between video and rich-text content.
- **Resource Downloads**: Easy access to lesson-specific materials.
- **Enrollment System**: Seamless registration and course progress tracking.

### **Admin & System**
- **Analytics Dashboard**: Insights into enrollment trends and user metrics.
- **Student Management**: Instructor-specific student views (enrolled only) and global admin controls.
- **Modern UI**: Built with Next.js and Tailwind CSS for a premium, responsive experience.

## 🛠️ Tech Stack

- **Frontend**: Next.js 15+, React, Tailwind CSS, Redux Toolkit, Framer Motion.
- **Backend**: NestJS, Prisma (Postgres), Cloudinary SDK.
- **Database**: PostgreSQL (Prisma ORM).
- **Media**: Cloudinary (Image & Video hosting).

## 📦 Project Structure

```bash
├── backend      # NestJS API
├── frontend     # Next.js Application
└── prisma       # Database schema and migrations
```

## ⚙️ Getting Started

### **1. Environment Setup**

Create a `.env` file in the `backend` directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/learning_system"
JWT_SECRET="your_secret_key"
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### **2. Installation**

```bash
# Install root dependencies (if any)
npm install

# Setup Backend
cd backend
npm install
npx prisma generate
npx prisma migrate dev

# Setup Frontend
cd ../frontend
npm install
```

### **3. Running the App**

```bash
# Start Backend (Port 5000)
cd backend
npm run start:dev

# Start Frontend (Port 3000)
cd frontend
npm run dev
```

## 🛡️ Security

- **Role-Based Access Control (RBAC)**: Distinct permissions for ADMIN, INSTRUCTOR, and STUDENT.
- **File Security**: All media uploads are authenticated and stored in specific Cloudinary folders.
- **State Management**: Redux Toolkit for secure and predictable client-side state.

---
Built with ❤️ for the HuyBoon Academy community.
