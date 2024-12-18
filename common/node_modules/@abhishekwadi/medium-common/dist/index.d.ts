import z from "zod";
export declare const sigUpInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}, {
    email: string;
    password: string;
    firstName?: string | undefined;
    lastName?: string | undefined;
}>;
export declare const sigInInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: string;
}, {
    title: string;
    content: string;
    id: string;
}>;
export type SignUpInputType = z.infer<typeof sigUpInput>;
export type SignInInputType = z.infer<typeof sigInInput>;
export type CreateBlogInputType = z.infer<typeof createBlogInput>;
export type UpdateBlogInputType = z.infer<typeof updateBlogInput>;
