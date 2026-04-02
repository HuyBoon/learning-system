import 'dotenv/config';
import { PrismaClient, Role, EnrollmentStatus } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

console.log('DATABASE_URL present:', !!process.env.DATABASE_URL);
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Cleaning database...');
  await prisma.enrollment.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.course.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding...');

  // Valid hash for 'password123'
  const hashedPassword = '$2b$10$rE5YZaK3wAl4nySQvqcbWeGFw0K78F0GkNDvRMhFIIbSkWDgrtKkG';

  // 1. Users
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      password: hashedPassword,
      name: 'System Admin',
      role: Role.ADMIN,
    },
  });

  const instructor = await prisma.user.create({
    data: {
      email: 'instructor@example.com',
      password: hashedPassword,
      name: 'John Doe',
      role: Role.INSTRUCTOR,
    },
  });

  const student = await prisma.user.create({
    data: {
      email: 'student@example.com',
      password: hashedPassword,
      name: 'Jane Smith',
      role: Role.STUDENT,
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
      thumbnail: 'https://images.unsplash.com/photo-1593720213428-28a5b9ed9461?auto=format&fit=crop&q=80&w=1000',
    },
  });

  const course2 = await prisma.course.create({
    data: {
      title: 'Mastering Python for Data',
      description: 'Comprehensive guide to Python and Pandas.',
      price: 79.99,
      instructorId: instructor.id,
      categoryId: dataScience.id,
      thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1000',
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
      status: EnrollmentStatus.COMPLETED,
    },
  });

  // 6. Bulk Students for scalability testing
  const bulkStudents = [];
  for (let i = 1; i <= 10; i++) {
    bulkStudents.push({
      email: `student${i}@example.com`,
      password: hashedPassword,
      name: `Test Student ${i}`,
      role: Role.STUDENT,
    });
  }
  await prisma.user.createMany({ data: bulkStudents });

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
