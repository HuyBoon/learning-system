# ⚙️ LMSCore Backend: Scalable Education API

[![NestJS](https://img.shields.io/badge/NestJS-red?logo=nestjs)](https://nestjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?logo=postgresql)](https://www.postgresql.org/)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=json-web-tokens)](https://jwt.io/)

The **LMSCore Backend** provides a robust, scalable, and secure REST API to power the educational platform. Built with NestJS and Prisma, it ensures type-safety from the database to the API layer.

---

## 🏗️ Core Architecture

- **Modular Design**: Each feature (Auth, Courses, Enrollment) is encapsulated in a NestJS module.
- **Provider Pattern**: Decoupled services for business logic and data access.
- **Type-Safe ORM**: Prisma for seamless database interactions and migrations.
- **JWT Authentication**: Secure stateless authentication using Passport.js.
- **DTOs & Validations**: Strict data transfer objects with Class-Validator.

---

## 🛠️ Technology Stack

| Feature | Technology |
| :--- | :--- |
| **Framework** | NestJS (TypeScript) |
| **Database** | PostgreSQL (Supabase) |
| **ORM** | Prisma |
| **Authentication** | Passport.js + JWT |
| **Documentation** | Swagger (TBD) |
| **Validation** | Class-Validator + Class-Transformer |
| **Logging** | Built-in NestJS Logger |

---

## 📁 API Modules

- **AuthModule**: Registration, login, and token management.
- **CourseModule**: CRUD operations for courses, lessons, and materials.
- **EnrollmentModule**: Logic for student-course enrollment and progress tracking.
- **UserModule**: Profile management and role-based permissions.

---

## 🚀 Getting Started

### 1. Installation
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file:
```env
DATABASE_URL="postgresql://user:pass@host:port/db"
JWT_SECRET="your-256-bit-secret"
JWT_EXPIRES_IN="24h"
PORT=5001
```

### 3. Database Sync
```bash
npx prisma generate
npx prisma migrate dev
```

### 4. Start Development
```bash
npm run start:dev
```

---

## 📄 API Documentation

- **Base URL**: `http://localhost:5001/api`
- **Auth Endpoint**: `/api/auth/login`, `/api/auth/register`
- **Course Endpoint**: `/api/courses`
- **Enrollment Endpoint**: `/api/enrollment`

---

## 🧪 Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

---

## 🤝 Contributing

Contributions are welcome! Please check our root `CONTRIBUTING.md`.
