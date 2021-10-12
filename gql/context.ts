import { PrismaClient } from "@prisma/client";
import { createLoaders, Loaders } from "./loaders";
import { createFetchers, Fetchers } from "./fetchers";

const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

export type Context = {
  db: PrismaClient;
  fetchers: {};
  loaders: Loaders;
};

export function context(): Context {
  const fetchers = createFetchers();
  const loaders = createLoaders(db);

  return { db, fetchers, loaders };
}
