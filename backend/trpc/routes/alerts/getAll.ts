import { publicProcedure } from "../../app-router";

export const getAllAlertsProcedure = publicProcedure.query(() => {
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
});