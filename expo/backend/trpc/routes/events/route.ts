import { protectedProcedure } from "../../create-context";
import { events } from "@/mocks/events";

// This procedure returns all events
export default protectedProcedure.query(async () => {
  // In a real app, this would fetch from a database
  // For now, we're returning mock data
  return events;
});