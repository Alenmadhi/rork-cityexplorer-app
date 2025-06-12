import { Hono } from "hono";
import { cors } from "hono/cors";
import { trpcServer } from "@hono/trpc-server";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";

const app = new Hono();

// Enable CORS for all routes
app.use("*", cors());

// Add tRPC endpoint
app.use("/api/trpc/*", trpcServer({
  router: appRouter,
  createContext,
}));

// Add a health check endpoint
app.get("/api/health", (c) => {
  return c.json({ status: "ok", timestamp: new Date().toISOString() });
});

export default app;