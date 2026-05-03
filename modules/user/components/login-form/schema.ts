import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "The password must be at least 6 characters long."),
});

export const registerSchema = z.object({
    name: z.string().min(2, "The name is too short"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "The password must be at least 6 characters long."),
    confirmPassword: z.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "The passwords do not match",
            path: ['confirmPassword'],
        });
    }
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
