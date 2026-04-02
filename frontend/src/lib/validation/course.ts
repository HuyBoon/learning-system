import * as z from 'zod';

export const courseSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  price: z.coerce.number().min(0, 'Price must be non-negative'),
  thumbnail: z.string().url('Invalid thumbnail URL').optional().or(z.literal('')),
  categoryId: z.string().uuid('Invalid category ID'),
});

export const lessonSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  videoUrl: z.string().url('Invalid video URL'),
  content: z.string().optional(),
  order: z.number().int().min(1),
});

export type CourseInput = z.infer<typeof courseSchema>;
export type LessonInput = z.infer<typeof lessonSchema>;
