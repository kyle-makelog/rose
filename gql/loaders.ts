import {
  PrismaClient,
  Project,
  Update,
  Organization,
  Person,
  Template,
} from "@prisma/client";
import Loader from "dataloader";

export type Loaders = {
  authorsByTemplate: Loader<string, Person[]>;
  authorsByUpdate: Loader<string, Person[]>;
  organizations: Loader<string, Organization>;
  projects: Loader<string, Project>;
  projectsByOrganization: Loader<string, Project[]>;
  templatesByOrganization: Loader<string, Template[]>;
  templatesByProject: Loader<string, Template[]>;
  updates: Loader<string, Update[]>;
  updatesByOrganization: Loader<string, Update[]>;
  updatesByProject: Loader<string, Update[]>;
};

export function createLoaders(db: PrismaClient): Loaders {
  return {
    // people
    //
    authorsByTemplate: new Loader(async (keys: readonly string[]) => {
      console.log("authorsByTemplate", keys, Date.now());

      const templates = await db.template.findMany({
        where: { id: { in: keys as string[] } },
        select: { id: true, authors: true },
      });
      return keys.map((key) => {
        const template = templates.find((q) => q.id === key);
        return template ? template.authors : [];
      });
    }),
    authorsByUpdate: new Loader(async (keys: readonly string[]) => {
      console.log("authorsByUpdate", keys, Date.now());

      const updates = await db.update.findMany({
        where: { id: { in: keys as string[] } },
        select: { id: true, authors: true },
      });
      return keys.map((key) => {
        const update = updates.find((q) => q.id === key);
        return update ? update.authors : [];
      });
    }),
    // organizations
    //
    organizations: new Loader(async (keys: readonly string[]) => {
      console.log("organizations", keys, Date.now());

      const organizations = await db.organization.findMany({
        where: { id: { in: keys as string[] } },
      });
      return keys.map(
        (key) =>
          organizations.find((q) => q.id === key) ||
          new Error(`No organizations with id: '${key}'`)
      );
    }),
    // projects
    //
    projects: new Loader(async (keys: readonly string[]) => {
      console.log("projects", keys, Date.now());

      const projects = await db.project.findMany({
        where: { id: { in: keys as string[] } },
      });
      return keys.map(
        (key) =>
          projects.find((q) => q.id === key) ||
          new Error(`No project with id: '${key}'`)
      );
    }),
    projectsByOrganization: new Loader(async (keys: readonly string[]) => {
      console.log("projectsByOrganization", keys, Date.now());

      const projects = await db.project.findMany({
        where: { organizationId: { in: keys as string[] } },
      });
      return keys.map((key) =>
        projects.filter((q) => q.organizationId === key)
      );
    }),
    // templates
    //
    templatesByOrganization: new Loader(async (keys: readonly string[]) => {
      console.log("templatesByOrganization keys", keys, Date.now());

      const templates = await db.template.findMany({
        where: {
          organizationId: { in: keys as string[] },
          AND: { projectId: null },
        },
      });
      return keys.map((key) =>
        templates.filter((q) => q.organizationId === key)
      );
    }),
    templatesByProject: new Loader(async (keys: readonly string[]) => {
      console.log("templatesByProject keys", keys, Date.now());

      const templates = await db.template.findMany({
        where: { projectId: { in: keys as string[] } },
      });
      return keys.map((key) => templates.filter((q) => q.projectId === key));
    }),
    // updates
    //
    updates: new Loader(async (keys: readonly string[]) => {
      console.log("updates keys", keys, Date.now());

      const updates = await db.update.findMany({
        where: { id: { in: keys as string[] } },
      });
      return keys.map((key) => updates.filter((q) => q.id === key));
    }),
    updatesByOrganization: new Loader(async (keys: readonly string[]) => {
      console.log("updatesByOrganization keys", keys, Date.now());

      const updates = await db.update.findMany({
        where: { organizationId: { in: keys as string[] } },
      });
      return keys.map((key) => updates.filter((q) => q.organizationId === key));
    }),
    updatesByProject: new Loader(async (keys: readonly string[]) => {
      console.log("updatesByProject keys", keys, Date.now());

      const updates = await db.update.findMany({
        where: { projectId: { in: keys as string[] } },
      });
      return keys.map((key) => updates.filter((q) => q.projectId === key));
    }),
  };
}
