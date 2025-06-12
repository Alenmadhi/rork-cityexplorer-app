import { protectedProcedure } from "../../create-context";
import { shops } from "@/mocks/shops";

// This procedure returns all shops
export default protectedProcedure.query(async () => {
  // In a real app, this would fetch from a database
  // For now, we're returning mock data
  return shops;
});