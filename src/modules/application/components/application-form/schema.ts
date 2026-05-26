import { z } from 'zod';

export const applicationSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  position: z.string().min(1, "Position is required"),
  
  url: z.string().url("Please enter a valid URL").optional().or(z.literal('')),
  recruiterEmail: z.string().email("Please enter a valid email").optional().or(z.literal('')),
  notes: z.string().optional(),
  followUpDate: z.string().optional(),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;