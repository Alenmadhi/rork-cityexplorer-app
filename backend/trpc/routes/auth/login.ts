import { z } from "zod";
import { publicProcedure } from "../../app-router";
import { TRPCError } from "@trpc/server";

export const loginProcedure = publicProcedure
  .input(
    z.object({
      email: z.string().email(),
      password: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    // In a real app, you would verify the credentials against a database
    // For now, we'll just return a mock response
    if (input.email === "admin@example.com" && input.password === "admin123") {
      return {
        success: true,
        user: {
          id: "admin-1",
          name: "Admin User",
          email: input.email,
          role: "admin",
        },
        token: "valid-token",
      };
    } else if (input.email === "user@example.com" && input.password === "user123") {
      return {
        success: true,
        user: {
          id: "user-1",
          name: "Test User",
          email: input.email,
          role: "user",
        },
        token: "valid-token",
      };
    } else {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Invalid email or password",
      });
    }
  });