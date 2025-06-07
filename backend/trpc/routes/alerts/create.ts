import { z } from "zod";
import { adminProcedure } from "../../app-router";

export const createAlertProcedure = adminProcedure
  .input(
    z.object({
      title: z.string(),
      message: z.string(),
      type: z.enum(["info", "warning", "danger"]),
      affectedAreas: z.array(z.string()).optional(),
      severity: z.enum(["low", "medium", "high"]).optional(),
      expectedDuration: z.string().optional(),
      contactInfo: z.string().optional(),
    })
  )
  .mutation(({ input }) => {
    // In a real app, you would store the alert in a database
    return {
      id: "new-alert-id",
      ...input,
      active: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  });