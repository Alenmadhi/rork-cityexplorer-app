import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import { hiProcedure } from "./routes/example/hi/route";
import { Context } from "./create-context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// Protected procedure - only authenticated users can access
export const protectedProcedure = t.procedure.use(isAuthed);

// Define your app router
export const appRouter = router({
  example: router({
    hi: hiProcedure,
    hello: publicProcedure
      .input(
        z.object({
          name: z.string().optional(),
        })
      )
      .query(({ input }) => {
        return {
          greeting: `Hello ${input.name || "World"}!`,
        };
      }),
  }),
  
  // Add more routers here
  alerts: router({
    getAll: publicProcedure.query(() => {
      // Mock data for emergency alerts
      return [
        {
          id: "1",
          title: "Flash Flood Warning",
          message: "Potential flooding in downtown area. Stay alert.",
          type: "warning",
          active: true,
          link: "/alerts/1",
        },
        {
          id: "2",
          title: "Road Closure",
          message: "Main Street closed for maintenance until Friday.",
          type: "info",
          active: true,
          link: "/alerts/2",
        },
        {
          id: "3",
          title: "Power Outage",
          message: "Scheduled power outage in North District on Tuesday.",
          type: "info",
          active: true,
          link: "/alerts/3",
        },
      ];
    }),
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;