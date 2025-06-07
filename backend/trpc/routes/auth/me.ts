import { protectedProcedure } from "../../app-router";

export const meProcedure = protectedProcedure.query(({ ctx }) => {
  return ctx.user;
});