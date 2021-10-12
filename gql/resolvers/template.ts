import model from "@prisma/client";
import { Context } from "../context";

type SetTemplateArgs = {
  author: string;
  content: string;
  name: string;
  organization: string;

  id?: string;
  project?: string;
};

type TemplatesArgs = {
  organization: string;
  project: string;
  skip: number;
  take: number;
};

export const template = {
  Template: {
    authors(p: model.Template, args: {}, ctx: Context) {
      return ctx.loaders.authorsByTemplate.load(p.id);
    },
    organization(p: model.Template, args: {}, ctx: Context) {
      return ctx.loaders.organizations.load(p.organizationId);
    },
    project(p: model.Template, args: {}, ctx: Context) {
      return p.projectId ? ctx.loaders.projects.load(p.projectId) : undefined;
    },
  },
  Query: {
    templates(p: {}, args: TemplatesArgs, ctx: Context) {
      return ctx.db.template.findMany({
        where: {
          organizationId: args.organization,
          projectId: args.project,
        },
        orderBy: { name: "asc" },
      });
    },
  },
  Mutation: {
    setTemplate(p: {}, args: SetTemplateArgs, ctx: Context) {
      return ctx.db.template.upsert({
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
