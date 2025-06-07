import { publicProcedure } from "../../../app-router";

export const hiProcedure = publicProcedure.query(() => {
  return {
    greeting: "Hello from tRPC server!",
    timestamp: new Date().toISOString(),
  };
});