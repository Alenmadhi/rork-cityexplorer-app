import { adminProcedure } from "../../app-router";

export const getDashboardStatsProcedure = adminProcedure.query(() => {
  // In a real app, you would fetch these stats from a database
  return {
    totalUsers: 1250,
    activeUsers: 850,
    totalIssues: 320,
    pendingIssues: 45,
    inProgressIssues: 75,
    resolvedIssues: 200,
    totalEvents: 25,
    upcomingEvents: 12,
    alertsActive: 3,
    permitsPending: 18,
  };
});