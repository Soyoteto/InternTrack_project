import { z } from "zod";

export const applicationSchema = z.object({
  company: z.string().min(2, "Company name must be at least 2 characters."),
  position: z.string().min(2, "Position must be at least 2 characters."),
  date: z.string().min(1, "Date is required."),
  status: z.enum(["Pending", "Interview", "Finalized"]),
});

export type ApplicationFormValues = z.infer<typeof applicationSchema>;