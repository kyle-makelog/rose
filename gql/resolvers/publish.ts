import model from "@prisma/client";
import { Context } from "../context";

export const publish = {
  Publish: {
    channel(p: model.Publish, args: {}, ctx: Context) {
      // TODO: create loader that fetches data from service
      //
      // return ctx.loaders.channels.load(p.channelId);
      return undefined;
    },
    update(p: model.Publish, args: {}, ctx: Context) {
      return ctx.loaders.updates.load(p.updateId);
    },
  },
};
