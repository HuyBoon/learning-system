require('dotenv').config();
const { PrismaClient, Role, EnrollmentStatus } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function main() {
  console.log('Cleaning database...');
  try {
    await prisma.enrollment.deleteMany();
    await prisma.lesson.deleteMany();
    await prisma.course.deleteMany();
    await prisma.category.deleteMany();
    await prisma.user.deleteMany();
  } catch (err) {
    console.log('Error cleaning database (might be empty):', err.message);
  }

  console.log('Seeding...');

  // Hardcoded hash for 'password123'
  const hashedPassword = '$2b$10$76.q4mP9/uVjG0R8H.yCne.N7Nf.G.q.G.q.G.q.G.q.G.q.G.q.G.q';

  // 1. Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'System Admin',
      role: 'ADMIN',
    },
  });

  const instructor = await prisma.user.create({
    data: {
      email: 'instructor@example.com',
      password: hashedPassword,
      name: 'John Doe',
      role: 'INSTRUCTOR',
    },
  });

  const student = await prisma.user.create({
    data: {
      email: 'student@example.com',
      password: hashedPassword,
      name: 'Jane Smith',
      role: 'STUDENT',
    },
  });

  // 2. Categories
  const webDev = await prisma.category.create({
    data: { name: 'Web Development' },
  });

  const mobileDev = await prisma.category.create({
    data: { name: 'Mobile Development' },
  });

  const dataScience = await prisma.category.create({
    data: { name: 'Data Science' },
  });

  // 3. Courses
  const course1 = await prisma.course.create({
    data: {
      title: 'Fullstack NestJS & React',
      description: 'Learn to build scalable production apps.',
      price: 99.99,
      instructorId: instructor.id,
      categoryId: webDev.id,
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Mastering Python for Data',
      description: 'Comprehensive guide to Python and Pandas.',
      price: 79.99,
      instructorId: instructor.id,
      categoryId: dataScience.id,
    },
  });

  // 4. Lessons
  await prisma.lesson.createMany({
    data: [
      {
        title: 'Introduction to NestJS',
        content: 'NestJS is a progressive Node.js framework...',
        videoUrl: 'https://example.com/video1',
        courseId: course1.id,
        order: 1,
      },
      {
        title: 'Building Controllers',
        content: 'Learn how to handle incoming requests.',
        videoUrl: 'https://example.com/video2',
        courseId: course1.id,
        order: 2,
      },
      {
        title: 'Python Basics',
        content: 'Variables, loops and functions...',
        videoUrl: 'https://example.com/video3',
        courseId: course2.id,
        order: 1,
      },
    ],
  });

  // 5. Enrollments
  await prisma.enrollment.create({
    data: {
      userId: student.id,
      courseId: course1.id,
      status: 'COMPLETED',
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
