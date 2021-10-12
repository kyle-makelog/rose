import model from "@prisma/client";
import { Context } from "../context";

type OrganizationArgs = {
  id: string;
};

export const organization = {
  Organization: {
    projects(p: model.Organization, args: {}, ctx: Context) {
      return ctx.loaders.projectsByOrganization.load(p.id);
    },
    templates(p: model.Organization, args: {}, ctx: Context) {
      return ctx.loaders.templatesByOrganization.load(p.id);
    },
    updates(p: model.Organization, args: {}, ctx: Context) {
      return ctx.loaders.updatesByOrganization.load(p.id);
    },
  },
  Query: {
    organization(p: {}, args: OrganizationArgs, ctx: Context) {
      return ctx.db.organization.findUnique({
        where: {
          id: args.id,
        },
      });
    },
    organizations(p: {}, args: {}, ctx: Context) {
      return ctx.db.organization.findMany({
        orderBy: { name: "asc" },
      });
    },
  },
  Mutation: {},
};
