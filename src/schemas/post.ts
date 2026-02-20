import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export const PostSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'The title must be at least 3 characters long.')
    .max(120, 'The title must have a maximum of 120 characters.'),
  content: z
    .string()
    .trim()
    .min(3, 'The content must be at least 3 characters long.')
    .transform((val) => sanitizeHtml(val)),
  isPublished: z
    .union([
      z.literal('on'),
      z.literal('off'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform((val) => val === 'on' || val === 'true' || val === true),
});
