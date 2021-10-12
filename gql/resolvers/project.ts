import model from "@prisma/client";
import { Context } from "../context";

type ProjectsArgs = {
  organization: string;
};

type SetProjectArgs = {
  organization: string;
  name: string;

  id?: string;
};

export const project = {
  Project: {
    organization(p: model.Project, args: {}, ctx: Context) {
      return ctx.loaders.organizations.load(p.organizationId);
    },
    templates(p: model.Project, args: {}, ctx: Context) {
      return ctx.loaders.templatesByProject.load(p.id);
    },
    updates(p: model.Project, args: {}, ctx: Context) {
      return ctx.loaders.updatesByProject.load(p.id);
    },
  },
  Query: {
    projects(p: {}, args: ProjectsArgs, ctx: Context) {
      return ctx.db.project.findMany({
        where: {
          organizationId: args.organization,
        },
        orderBy: { name: "asc" },
      });
    },
  },
  Mutation: {
    setProject(p: {}, args: SetProjectArgs, ctx: Context) {
      return ctx.db.project.upsert({
        where: { id: args.id },
        create: {
          name: args.name,
          organization: { connect: { id: args.organization } },
        },
        update: {
          name: args.name,
        },
      });
    },
  },
};
