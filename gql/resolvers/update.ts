import model from "@prisma/client";
import { Context } from "../context";

type UpdatesArgs = {
  organization: string;
  project: string;
  skip: number;
  take: number;
};

type SetUpdateArgs = {
  author: string;
  content: string;
  name: string;
  organization: string;

  id?: string;
  project?: string;
};

export const update = {
  Update: {
    authors(p: model.Update, args: {}, ctx: Context) {
      return ctx.loaders.authorsByUpdate.load(p.id);
    },
    organization(p: model.Update, args: {}, ctx: Context) {
      return ctx.loaders.organizations.load(p.organizationId);
    },
    project(p: model.Update, args: {}, ctx: Context) {
      return ctx.loaders.projects.load(p.projectId);
    },
  },
  Query: {
    updates(p: any, args: UpdatesArgs, ctx: Context) {
      return ctx.db.update.findMany({
        where: {
          organizationId: args.organization,
          projectId: args.project,
        },
        orderBy: { name: "asc" },
      });
    },
  },
  Mutation: {
    setUpdate(p: {}, args: SetUpdateArgs, ctx: Context) {
      return ctx.db.update.upsert({
        where: { id: args.id },
        create: {
          name: args.name,
          content: args.content,
          authors: {
            connect: { email: args.author },
          },
          organization: { connect: { id: args.organization } },
          project: { connect: { id: args.project } },
        },
        update: {
          content: args.content,
          name: args.name,
          authors: {
            connect: { email: args.author },
          },
        },
      });
    },
  },
};
