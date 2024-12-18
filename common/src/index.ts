import z from "zod";

export const sigUpInput = z.object({
  email: z.string().email(),
  password: z.string().min(4),
  firstName: z.string().min(2).optional(),
  lastName: z.string().min(2).optional(),
});
export const sigInInput = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});
export const createBlogInput = z.object({
  title: z.string(),
  content: z.string(),
});
export const updateBlogInput = z.object({
  title: z.string(),
  content: z.string(),
  id: z.string(),
});

export type SignUpInputType = z.infer<typeof sigUpInput>;
export type SignInInputType = z.infer<typeof sigInInput>;
export type CreateBlogInputType = z.infer<typeof createBlogInput>;
export type UpdateBlogInputType = z.infer<typeof updateBlogInput>;
