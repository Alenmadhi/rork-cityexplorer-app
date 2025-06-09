import { Hono } from "hono";
import { trpcServer } from "@hono/trpc-server";
import { cors } from "hono/cors";
import { appRouter } from "./trpc/app-router";
import { createContext } from "./trpc/create-context";
import { jwt } from "hono/jwt";

// Define the environment with JWT
type Variables = {
  jwtPayload: {
    sub: string;
    name: string;
    email: string;
    role: string;
  };
};

// app will be mounted at /api
const app = new Hono<{ Variables: Variables }>();

// Enable CORS for all routes
app.use("*", cors());

// JWT middleware for protected routes
// In a real app, you would use a proper secret key stored in environment variables
const JWT_SECRET = "your-secret-key";

app.use("/protected/*", jwt({ secret: JWT_SECRET }));

// Mount tRPC router at /trpc
app.use(
  "/trpc/*",
  trpcServer({
    endpoint: "/api/trpc",
    router: appRouter,
    createContext,
  })
);

// Simple health check endpoint
app.get("/", (c) => {
  return c.json({ status: "ok", message: "API is running" });
});

// Direct API endpoints (alternative to tRPC)
app.get("/alerts", async (c) => {
  // In a real app, you would fetch alerts from a database
  const alerts = [
    {
      id: "1",
      title: "Flash Flood Warning",
      message: "Potential flooding in downtown area. Stay alert.",
      type: "warning",
      active: true,
    },
    {
      id: "2",
      title: "Road Closure",
      message: "Main Street closed for maintenance until Friday.",
      type: "info",
      active: true,
    },
  ];
  
  return c.json(alerts);
});

app.get("/events", async (c) => {
  // In a real app, you would fetch events from a database
  const events = [
    {
      id: "1",
      title: "City Festival",
      description: "Annual city festival with music, food, and activities for all ages.",
      date: "2025-07-15",
      location: "City Park",
    },
    {
      id: "2",
      title: "Tech Conference",
      description: "Learn about the latest technologies and network with professionals.",
      date: "2025-08-20",
      location: "Convention Center",
    },
  ];
  
  return c.json(events);
});

// Protected routes example
app.get("/protected/user-profile", async (c) => {
  const payload = c.get("jwtPayload");
  
  // In a real app, you would fetch the user profile from a database
  return c.json({
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    role: payload.role,
  });
});

// Authentication endpoints
app.post("/auth/login", async (c) => {
  const { email, password } = await c.req.json();
  
  // In a real app, you would verify credentials against a database
  if (email === "admin@example.com" && password === "admin123") {
    const token = await c.jwt.sign({
      sub: "admin-1",
      name: "Admin User",
      email: email,
      role: "admin",
    }, { secret: JWT_SECRET });
    
    return c.json({
      success: true,
      user: {
        id: "admin-1",
        name: "Admin User",
        email: email,
        role: "admin",
      },
      token,
    });
  } else if (email === "user@example.com" && password === "user123") {
    const token = await c.jwt.sign({
      sub: "user-1",
      name: "Test User",
      email: email,
      role: "user",
    }, { secret: JWT_SECRET });
    
    return c.json({
      success: true,
      user: {
        id: "user-1",
        name: "Test User",
        email: email,
        role: "user",
      },
      token,
    });
  } else {
    return c.json({ success: false, message: "Invalid email or password" }, 401);
  }
});

app.post("/auth/signup", async (c) => {
  const { name, email, password } = await c.req.json();
  
  // In a real app, you would validate input and store the user in a database
  // For now, we'll just return a mock response
  const token = await c.jwt.sign({
    sub: "new-user-id",
    name: name,
    email: email,
    role: "user",
  }, { secret: JWT_SECRET });
  
  return c.json({
    success: true,
    user: {
      id: "new-user-id",
      name: name,
      email: email,
      role: "user",
    },
    token,
  });
});

export default app;