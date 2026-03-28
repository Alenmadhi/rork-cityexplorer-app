import { protectedProcedure } from "../../create-context";
import { news } from "@/mocks/news";

// This procedure returns all news items
export default protectedProcedure.query(async () => {
  // In a real app, this would fetch from a database
  // For now, we're returning mock data
  return news;
});