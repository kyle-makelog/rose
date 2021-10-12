import { deepmerge } from "deepmerge-ts";
import { organization } from "./organization";
import { person } from "./person";
import { project } from "./project";
import { scalars } from "./scalars";
import { template } from "./template";
import { update } from "./update";

export const resolvers = deepmerge(
  scalars,
  organization,
  person,
  project,
  template,
  update
);
