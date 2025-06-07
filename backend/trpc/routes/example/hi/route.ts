import { protectedProcedure } from "../../../app-router";

export const hiProcedure = protectedProcedure.query(() => {
  return {
    greeting: "Hello from a protected route!",
    timestamp: new Date().toISOString(),
  };
});