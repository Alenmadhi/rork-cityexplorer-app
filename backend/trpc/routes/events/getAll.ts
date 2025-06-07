import { z } from "zod";
import { publicProcedure } from "../../app-router";

export const getAllEventsProcedure = publicProcedure
  .input(
    z.object({
      limit: z.number().min(1).max(100).optional(),
      cursor: z.string().optional(),
      filter: z.object({
        category: z.string().optional(),
        isFree: z.boolean().optional(),
        search: z.string().optional(),
      }).optional(),
    })
  )
  .query(({ input }) => {
    // In a real app, you would fetch events from a database with pagination
    const events = [
      {
        id: "1",
        title: "City Festival",
        description: "Annual city festival with music, food, and activities for all ages.",
        image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3",
        date: "2025-07-15",
        time: "10:00 AM - 10:00 PM",
        location: "City Park",
        organizer: "City Council",
        category: "Festival",
        isFree: true,
      },
      {
        id: "2",
        title: "Tech Conference",
        description: "Learn about the latest technologies and network with professionals.",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
        date: "2025-08-20",
        time: "9:00 AM - 5:00 PM",
        location: "Convention Center",
        organizer: "Tech Association",
        category: "Conference",
        isFree: false,
        price: "$50",
      },
    ];
    
    // Apply filters if provided
    let filteredEvents = events;
    if (input.filter) {
      if (input.filter.category) {
        filteredEvents = filteredEvents.filter(event => 
          event.category === input.filter?.category
        );
      }
      if (input.filter.isFree !== undefined) {
        filteredEvents = filteredEvents.filter(event => 
          event.isFree === input.filter?.isFree
        );
      }
      if (input.filter.search) {
        const searchLower = input.filter.search.toLowerCase();
        filteredEvents = filteredEvents.filter(event => 
          event.title.toLowerCase().includes(searchLower) ||
          event.description.toLowerCase().includes(searchLower)
        );
      }
    }
    
    // Apply pagination
    const limit = input.limit || 10;
    const startIndex = input.cursor ? events.findIndex(e => e.id === input.cursor) + 1 : 0;
    const paginatedEvents = filteredEvents.slice(startIndex, startIndex + limit);
    
    return {
      items: paginatedEvents,
      nextCursor: paginatedEvents.length === limit ? paginatedEvents[paginatedEvents.length - 1].id : null,
    };
  });