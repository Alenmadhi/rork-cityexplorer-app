import { z } from "zod";
import { publicProcedure } from "../../app-router";

export const getAllIssuesProcedure = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).optional(),
      cursor: z.string().optional(),
      filter: z.object({
        status: z.enum(["pending", "in-progress", "resolved"]).optional(),
        type: z.string().optional(),
        search: z.string().optional(),
      }).optional(),
    })
  )
  .query(({ input }) => {
    // In a real app, you would fetch issues from a database with pagination
    const issues = [
      {
        id: "1",
        title: "Pothole on Main Street",
        description: "Large pothole causing traffic issues",
        location: "Main Street",
        coordinates: {
          latitude: 41.1123,
          longitude: 20.0826,
        },
        type: "Road Damage",
        status: "pending",
        reportedBy: "user-1",
        reportedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        images: ["https://images.unsplash.com/photo-1515162816999-a0c47dc192f7"],
        votes: 5,
        comments: 2,
      },
      {
        id: "2",
        title: "Broken Street Light",
        description: "Street light not working for 3 days",
        location: "Park Avenue",
        coordinates: {
          latitude: 41.1153,
          longitude: 20.0856,
        },
        type: "Broken Light",
        status: "in-progress",
        reportedBy: "user-2",
        reportedDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
        images: ["https://images.unsplash.com/photo-1542574621-e088a4464f7e"],
        votes: 3,
        comments: 1,
      },
      {
        id: "3",
        title: "Trash Overflow",
        description: "Trash containers overflowing near the market",
        location: "Market Square",
        coordinates: {
          latitude: 41.1103,
          longitude: 20.0796,
        },
        type: "Trash",
        status: "resolved",
        reportedBy: "user-3",
        reportedDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
        resolvedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        images: ["https://images.unsplash.com/photo-1605600659453-719282b41e1a"],
        votes: 8,
        comments: 4,
      },
    ];
    
    // Apply filters if provided
    let filteredIssues = issues;
    if (input.filter) {
      if (input.filter.status) {
        filteredIssues = filteredIssues.filter(issue => 
          issue.status === input.filter?.status
        );
      }
      if (input.filter.type) {
        filteredIssues = filteredIssues.filter(issue => 
          issue.type === input.filter?.type
        );
      }
      if (input.filter.search) {
        const searchLower = input.filter.search.toLowerCase();
        filteredIssues = filteredIssues.filter(issue => 
          issue.title.toLowerCase().includes(searchLower) ||
          issue.description.toLowerCase().includes(searchLower) ||
          issue.location.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Apply pagination
    const limit = input.limit || 10;
    const startIndex = input.cursor ? issues.findIndex(i => i.id === input.cursor) + 1 : 0;
    const paginatedIssues = filteredIssues.slice(startIndex, startIndex + limit);
    
    return {
      items: paginatedIssues,
      nextCursor: paginatedIssues.length === limit ? paginatedIssues[paginatedIssues.length - 1].id : null,
    };
  });