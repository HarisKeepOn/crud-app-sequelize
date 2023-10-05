import { z } from "zod";

export const createBetaUserSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email is required",
    }),
  }),
});

export type CreateBetaUserInput = z.TypeOf<typeof createBetaUserSchema>["body"];