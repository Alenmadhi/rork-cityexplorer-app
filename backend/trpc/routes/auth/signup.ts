import { z } from "zod";
import { publicProcedure } from "../../app-router";

export const signupProcedure = publicProcedure
  .input(
    z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
    })
  )
  .mutation(async ({ input }) => {
    // In a real app, you would hash the password and store the user in a database
    // For now, we'll just return a mock response
    return {
      success: true,
      user: {
        id: "new-user-id",
        name: input.name,
        email: input.email,
        role: "user",
      },
      token: "valid-token",
    };
  });