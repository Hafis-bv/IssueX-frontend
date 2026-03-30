import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters"),
  description: z.string().optional(),
  projectId: z.string().min(1, "Project is required"),
});
