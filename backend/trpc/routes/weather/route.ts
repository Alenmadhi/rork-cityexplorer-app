import { protectedProcedure } from "../../create-context";
import { mockWeather } from "@/mocks/weather";

// This procedure returns weather data
export default protectedProcedure.query(async () => {
  // In a real app, this would fetch from a weather API
  // For now, we're returning mock data with current timestamp
  return {
    ...mockWeather,
    lastUpdated: new Date().toISOString()
  };
});