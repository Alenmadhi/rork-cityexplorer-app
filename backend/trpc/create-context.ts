import { inferAsyncReturnType } from "@trpc/server";
import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin' | 'moderator';
}

// Function to create context for each request
export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  // Get auth token from header
  const authHeader = req.headers.get("authorization");
  
  // Simple auth check - in a real app, you would validate the token
  // and fetch the user from a database
  let user: User | null = null;
  
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    
    // Mock user authentication - replace with real auth logic
    if (token === "valid-token") {
      user = {
        id: "user-1",
        name: "Test User",
        email: "test@example.com",
        role: "user"
      };
    }
  }
  
  return {
    req,
    resHeaders,
    user,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;