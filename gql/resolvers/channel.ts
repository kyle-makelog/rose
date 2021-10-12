import model from "@prisma/client";
import { Context } from "../context";

export const publish = {
  Publish: {
    updates(p: model.Publish, args: {}, ctx: Context) {
      return ctx.loaders.updates.load(p.updateId);
    },
  },
};
