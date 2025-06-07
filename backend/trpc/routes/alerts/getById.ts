import { z } from "zod";
import { publicProcedure } from "../../app-router";

export const getAlertByIdProcedure = publicProcedure
  .input(z.object({ id: z.string() }))
  .query(({ input }) => {
    // In a real app, you would fetch the alert from a database
    return {
      id: input.id,
      title: "Flash Flood Warning",
      message: "Potential flooding in downtown area. Stay alert and avoid low-lying areas. Emergency services are on standby.",
      type: "warning",
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      affectedAreas: ["Downtown", "Riverside", "East District"],
      severity: "high",
      expectedDuration: "24 hours",
      contactInfo: "Emergency Services: 555-1234",
    };
  });