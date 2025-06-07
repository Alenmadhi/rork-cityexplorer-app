import { initTRPC, TRPCError } from "@trpc/server";
import { z } from "zod";
import superjson from "superjson";
import { hiProcedure } from "./routes/example/hi/route";
import { Context } from "./create-context";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

// Base router and procedure helpers
export const router = t.router;
export const publicProcedure = t.procedure;

// Middleware to check if user is authenticated
const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// Middleware to check if user is an admin
const isAdmin = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to access this resource",
    });
  }
  
  if (ctx.user.role !== 'admin') {
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "You must be an admin to access this resource",
    });
  }
  
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

// Protected procedure - only authenticated users can access
export const protectedProcedure = t.procedure.use(isAuthed);

// Admin procedure - only admin users can access
export const adminProcedure = t.procedure.use(isAdmin);

// Define your app router
export const appRouter = router({
  example: router({
    hi: hiProcedure,
    hello: publicProcedure
      .input(
        z.object({
          name: z.string().optional(),
        })
      )
      .query(({ input }) => {
        return {
          greeting: `Hello ${input.name || "World"}!`,
        };
      }),
  }),
  
  // Auth router
  auth: router({
    signup: publicProcedure
      .input(
        z.object({
          name: z.string().min(2),
          email: z.string().email(),
          password: z.string().min(6),
        })
      )
      .mutation(async ({ input }) => {
        // In a real app, you would hash the password and store the user in a database
        // For now, we'll just return a mock response
        return {
          success: true,
          user: {
            id: "new-user-id",
            name: input.name,
            email: input.email,
            role: "user",
          },
          token: "valid-token",
        };
      }),
      
    login: publicProcedure
      .input(
        z.object({
          email: z.string().email(),
          password: z.string(),
        })
      )
      .mutation(async ({ input }) => {
        // In a real app, you would verify the credentials against a database
        // For now, we'll just return a mock response
        if (input.email === "admin@example.com" && input.password === "admin123") {
          return {
            success: true,
            user: {
              id: "admin-1",
              name: "Admin User",
              email: input.email,
              role: "admin",
            },
            token: "valid-token",
          };
        } else if (input.email === "user@example.com" && input.password === "user123") {
          return {
            success: true,
            user: {
              id: "user-1",
              name: "Test User",
              email: input.email,
              role: "user",
            },
            token: "valid-token",
          };
        } else {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Invalid email or password",
          });
        }
      }),
      
    me: protectedProcedure.query(({ ctx }) => {
      return ctx.user;
    }),
  }),
  
  // Alerts router
  alerts: router({
    getAll: publicProcedure.query(() => {
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
    }),
    
    getById: publicProcedure
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
      }),
    
    create: adminProcedure
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
      }),
    
    update: adminProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          message: z.string().optional(),
          type: z.enum(["info", "warning", "danger"]).optional(),
          active: z.boolean().optional(),
          affectedAreas: z.array(z.string()).optional(),
          severity: z.enum(["low", "medium", "high"]).optional(),
          expectedDuration: z.string().optional(),
          contactInfo: z.string().optional(),
        })
      )
      .mutation(({ input }) => {
        // In a real app, you would update the alert in a database
        return {
          id: input.id,
          title: input.title || "Flash Flood Warning",
          message: input.message || "Potential flooding in downtown area. Stay alert.",
          type: input.type || "warning",
          active: input.active !== undefined ? input.active : true,
          updatedAt: new Date().toISOString(),
          affectedAreas: input.affectedAreas || ["Downtown"],
          severity: input.severity || "high",
          expectedDuration: input.expectedDuration || "24 hours",
          contactInfo: input.contactInfo || "Emergency Services: 555-1234",
        };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(({ input }) => {
        // In a real app, you would delete the alert from a database
        return { success: true };
      }),
  }),
  
  // Events router
  events: router({
    getAll: publicProcedure
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
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        // In a real app, you would fetch the event from a database
        return {
          id: input.id,
          title: "City Festival",
          description: "Annual city festival with music, food, and activities for all ages.",
          fullDescription: "Join us for the annual City Festival, a celebration of our community with live music performances, local food vendors, art exhibitions, and activities for all ages. The festival will feature multiple stages with diverse musical acts, a food court with cuisines from around the world, a craft market, and a dedicated kids' zone with games and entertainment.",
          image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3",
          gallery: [
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3",
            "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
            "https://images.unsplash.com/photo-1506157786151-b8491531f063",
          ],
          date: "2025-07-15",
          time: "10:00 AM - 10:00 PM",
          location: "City Park",
          coordinates: {
            latitude: 41.1123,
            longitude: 20.0826,
          },
          organizer: "City Council",
          category: "Festival",
          isFree: true,
          contactEmail: "events@citycouncil.gov",
          contactPhone: "555-1234",
          website: "https://cityfestival.example.com",
        };
      }),
    
    create: adminProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string(),
          fullDescription: z.string().optional(),
          image: z.string(),
          gallery: z.array(z.string()).optional(),
          date: z.string(),
          time: z.string(),
          location: z.string(),
          coordinates: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }).optional(),
          organizer: z.string(),
          category: z.string(),
          isFree: z.boolean(),
          price: z.string().optional(),
          contactEmail: z.string().email().optional(),
          contactPhone: z.string().optional(),
          website: z.string().url().optional(),
        })
      )
      .mutation(({ input }) => {
        // In a real app, you would store the event in a database
        return {
          id: "new-event-id",
          ...input,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      }),
    
    update: adminProcedure
      .input(
        z.object({
          id: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
          fullDescription: z.string().optional(),
          image: z.string().optional(),
          gallery: z.array(z.string()).optional(),
          date: z.string().optional(),
          time: z.string().optional(),
          location: z.string().optional(),
          coordinates: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }).optional(),
          organizer: z.string().optional(),
          category: z.string().optional(),
          isFree: z.boolean().optional(),
          price: z.string().optional(),
          contactEmail: z.string().email().optional(),
          contactPhone: z.string().optional(),
          website: z.string().url().optional(),
        })
      )
      .mutation(({ input }) => {
        // In a real app, you would update the event in a database
        return {
          id: input.id,
          title: input.title || "City Festival",
          description: input.description || "Annual city festival with music, food, and activities for all ages.",
          fullDescription: input.fullDescription || "Join us for the annual City Festival...",
          image: input.image || "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3",
          gallery: input.gallery || [
            "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3",
            "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
          ],
          date: input.date || "2025-07-15",
          time: input.time || "10:00 AM - 10:00 PM",
          location: input.location || "City Park",
          coordinates: input.coordinates || {
            latitude: 41.1123,
            longitude: 20.0826,
          },
          organizer: input.organizer || "City Council",
          category: input.category || "Festival",
          isFree: input.isFree !== undefined ? input.isFree : true,
          price: input.price,
          contactEmail: input.contactEmail || "events@citycouncil.gov",
          contactPhone: input.contactPhone || "555-1234",
          website: input.website || "https://cityfestival.example.com",
          updatedAt: new Date().toISOString(),
        };
      }),
    
    delete: adminProcedure
      .input(z.object({ id: z.string() }))
      .mutation(({ input }) => {
        // In a real app, you would delete the event from a database
        return { success: true };
      }),
  }),
  
  // City services router
  services: router({
    getAll: publicProcedure.query(() => {
      // Mock data for city services
      return [
        {
          id: "1",
          name: "Waste Collection",
          description: "Schedule and information for waste collection services.",
          icon: "trash",
          category: "Utilities",
        },
        {
          id: "2",
          name: "Water Services",
          description: "Information about water supply, quality, and billing.",
          icon: "droplet",
          category: "Utilities",
        },
        {
          id: "3",
          name: "Building Permits",
          description: "Apply for and track building permits.",
          icon: "building",
          category: "Permits",
        },
        {
          id: "4",
          name: "Public Transportation",
          description: "Schedules and routes for buses and other public transport.",
          icon: "bus",
          category: "Transportation",
        },
      ];
    }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        // In a real app, you would fetch the service from a database
        const services = {
          "1": {
            id: "1",
            name: "Waste Collection",
            description: "Schedule and information for waste collection services.",
            fullDescription: "The city provides regular waste collection services for residential and commercial properties. Collection days vary by neighborhood.",
            icon: "trash",
            category: "Utilities",
            schedule: {
              monday: ["North District"],
              tuesday: ["East District"],
              wednesday: ["South District"],
              thursday: ["West District"],
              friday: ["Downtown"],
              saturday: ["Commercial Areas"],
              sunday: [],
            },
            contactEmail: "waste@citycouncil.gov",
            contactPhone: "555-1234",
            website: "https://waste.citycouncil.gov",
          },
          "2": {
            id: "2",
            name: "Water Services",
            description: "Information about water supply, quality, and billing.",
            fullDescription: "The city provides clean and safe drinking water to all residents. Water quality is regularly tested and meets all safety standards.",
            icon: "droplet",
            category: "Utilities",
            rates: {
              residential: "$2.50 per 1000 gallons",
              commercial: "$3.50 per 1000 gallons",
              industrial: "$4.50 per 1000 gallons",
            },
            paymentOptions: ["Online", "Mail", "In Person", "Phone"],
            contactEmail: "water@citycouncil.gov",
            contactPhone: "555-5678",
            website: "https://water.citycouncil.gov",
          },
        };
        
        return services[input.id as keyof typeof services] || null;
      }),
    
    getSchedule: publicProcedure
      .input(
        z.object({
          serviceId: z.string(),
          date: z.string().optional(), // ISO date string
        })
      )
      .query(({ input }) => {
        // In a real app, you would fetch the schedule from a database
        // For now, we'll return mock data for waste collection
        if (input.serviceId === "1") {
          const today = input.date ? new Date(input.date) : new Date();
          const dayOfWeek = today.getDay();
          const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
          const todayName = dayNames[dayOfWeek];
          
          const schedule = {
            monday: ["North District"],
            tuesday: ["East District"],
            wednesday: ["South District"],
            thursday: ["West District"],
            friday: ["Downtown"],
            saturday: ["Commercial Areas"],
            sunday: [],
          };
          
          return {
            date: today.toISOString().split("T")[0],
            day: todayName,
            areas: schedule[todayName as keyof typeof schedule] || [],
            nextPickup: {
              date: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              day: todayName,
            },
          };
        }
        
        return null;
      }),
    
    applyForPermit: protectedProcedure
      .input(
        z.object({
          serviceId: z.string(),
          type: z.string(),
          description: z.string(),
          address: z.string(),
          contactName: z.string(),
          contactEmail: z.string().email(),
          contactPhone: z.string(),
          attachments: z.array(z.string()).optional(),
        })
      )
      .mutation(({ input, ctx }) => {
        // In a real app, you would store the permit application in a database
        return {
          id: "new-permit-id",
          userId: ctx.user.id,
          ...input,
          status: "pending",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          estimatedCompletionDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        };
      }),
    
    getPermitStatus: protectedProcedure
      .input(z.object({ permitId: z.string() }))
      .query(({ input }) => {
        // In a real app, you would fetch the permit status from a database
        return {
          id: input.permitId,
          status: "in-review",
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          estimatedCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          notes: "Your application is currently being reviewed by the building department.",
          nextSteps: "Once reviewed, you will be notified of approval or any required changes.",
          assignedTo: "Building Department",
        };
      }),
  }),
  
  // Feedback/Issues router
  issues: router({
    getAll: publicProcedure
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
      }),
    
    getById: publicProcedure
      .input(z.object({ id: z.string() }))
      .query(({ input }) => {
        // In a real app, you would fetch the issue from a database
        const issues = {
          "1": {
            id: "1",
            title: "Pothole on Main Street",
            description: "Large pothole causing traffic issues. It's about 2 feet wide and 6 inches deep. Several cars have been damaged.",
            location: "Main Street near City Hall",
            coordinates: {
              latitude: 41.1123,
              longitude: 20.0826,
            },
            type: "Road Damage",
            status: "pending",
            reportedBy: "user-1",
            reportedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
            images: [
              "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7",
              "https://images.unsplash.com/photo-1594818379496-da1e345b0ded",
            ],
            votes: 5,
            comments: [
              {
                id: "comment-1",
                userId: "user-2",
                userName: "Jane Smith",
                text: "I hit this pothole yesterday and damaged my tire.",
                createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
              },
              {
                id: "comment-2",
                userId: "user-3",
                userName: "Bob Johnson",
                text: "This needs to be fixed ASAP. It's a hazard.",
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            updates: [],
          },
          "2": {
            id: "2",
            title: "Broken Street Light",
            description: "Street light not working for 3 days. It's completely dark at night and feels unsafe.",
            location: "Park Avenue near the playground",
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
            comments: [
              {
                id: "comment-3",
                userId: "user-1",
                userName: "John Doe",
                text: "I walk my dog here at night and it's very dark now.",
                createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
              },
            ],
            updates: [
              {
                id: "update-1",
                status: "in-progress",
                text: "Maintenance team has been dispatched to assess the issue.",
                createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                updatedBy: "admin-1",
                updatedByName: "City Maintenance",
              },
            ],
          },
        };
        
        return issues[input.id as keyof typeof issues] || null;
      }),
    
    create: protectedProcedure
      .input(
        z.object({
          title: z.string(),
          description: z.string(),
          location: z.string(),
          coordinates: z.object({
            latitude: z.number(),
            longitude: z.number(),
          }),
          type: z.string(),
          images: z.array(z.string()).optional(),
        })
      )
      .mutation(({ input, ctx }) => {
        // In a real app, you would store the issue in a database
        return {
          id: "new-issue-id",
          ...input,
          status: "pending",
          reportedBy: ctx.user.id,
          reportedDate: new Date().toISOString(),
          votes: 0,
          comments: [],
          updates: [],
        };
      }),
    
    vote: protectedProcedure
      .input(z.object({ issueId: z.string() }))
      .mutation(({ input }) => {
        // In a real app, you would update the issue in a database
        return { success: true };
      }),
    
    comment: protectedProcedure
      .input(
        z.object({
          issueId: z.string(),
          text: z.string(),
        })
      )
      .mutation(({ input, ctx }) => {
        // In a real app, you would store the comment in a database
        return {
          id: "new-comment-id",
          userId: ctx.user.id,
          userName: ctx.user.name,
          text: input.text,
          createdAt: new Date().toISOString(),
        };
      }),
    
    updateStatus: adminProcedure
      .input(
        z.object({
          issueId: z.string(),
          status: z.enum(["pending", "in-progress", "resolved"]),
          updateText: z.string(),
        })
      )
      .mutation(({ input, ctx }) => {
        // In a real app, you would update the issue in a database
        return {
          id: "new-update-id",
          status: input.status,
          text: input.updateText,
          createdAt: new Date().toISOString(),
          updatedBy: ctx.user.id,
          updatedByName: ctx.user.name,
        };
      }),
  }),
  
  // Admin dashboard router
  admin: router({
    getDashboardStats: adminProcedure.query(() => {
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
    }),
    
    getUsersList: adminProcedure
      .input(
        z.object({
          limit: z.number().min(1).max(100).optional(),
          cursor: z.string().optional(),
          filter: z.object({
            role: z.enum(["user", "admin", "moderator"]).optional(),
            search: z.string().optional(),
          }).optional(),
        })
      )
      .query(({ input }) => {
        // In a real app, you would fetch users from a database with pagination
        const users = [
          {
            id: "user-1",
            name: "John Doe",
            email: "john@example.com",
            role: "user",
            createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            issuesReported: 5,
            issuesResolved: 3,
          },
          {
            id: "user-2",
            name: "Jane Smith",
            email: "jane@example.com",
            role: "moderator",
            createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
            issuesReported: 8,
            issuesResolved: 6,
          },
          {
            id: "admin-1",
            name: "Admin User",
            email: "admin@example.com",
            role: "admin",
            createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date().toISOString(),
            issuesReported: 0,
            issuesResolved: 15,
          },
        ];
        
        // Apply filters if provided
        let filteredUsers = users;
        if (input.filter) {
          if (input.filter.role) {
            filteredUsers = filteredUsers.filter(user => 
              user.role === input.filter?.role
            );
          }
          if (input.filter.search) {
            const searchLower = input.filter.search.toLowerCase();
            filteredUsers = filteredUsers.filter(user => 
              user.name.toLowerCase().includes(searchLower) ||
              user.email.toLowerCase().includes(searchLower)
            );
          }
        }
        
        // Apply pagination
        const limit = input.limit || 10;
        const startIndex = input.cursor ? users.findIndex(u => u.id === input.cursor) + 1 : 0;
        const paginatedUsers = filteredUsers.slice(startIndex, startIndex + limit);
        
        return {
          items: paginatedUsers,
          nextCursor: paginatedUsers.length === limit ? paginatedUsers[paginatedUsers.length - 1].id : null,
        };
      }),
    
    updateUserRole: adminProcedure
      .input(
        z.object({
          userId: z.string(),
          role: z.enum(["user", "admin", "moderator"]),
        })
      )
      .mutation(({ input }) => {
        // In a real app, you would update the user in a database
        return { success: true };
      }),
  }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;