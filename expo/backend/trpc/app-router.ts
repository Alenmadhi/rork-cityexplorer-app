import { createTRPCRouter } from "./create-context";
import hiRoute from "./routes/example/hi/route";
import eventsRoute from "./routes/events/route";
import newsRoute from "./routes/news/route";
import shopsRoute from "./routes/shops/route";
import weatherRoute from "./routes/weather/route";

export const appRouter = createTRPCRouter({
  example: createTRPCRouter({
    hi: hiRoute,
  }),
  events: eventsRoute,
  news: newsRoute,
  shops: shopsRoute,
  weather: weatherRoute,
});

export type AppRouter = typeof appRouter;