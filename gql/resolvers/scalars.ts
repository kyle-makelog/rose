import { GraphQLScalarType, Kind } from "graphql";

const DateTime = new GraphQLScalarType({
  name: "DateTime",
  description: "The DateTime scalar type represents a Date and Time",

  parseLiteral(ast: any) {
    if (ast.kind === Kind.INT) {
      return new Date(parseInt(ast.value, 10));
    }
    return null;
  },
  parseValue(value: number) {
    return new Date(value);
  },
  serialize(value: Date) {
    return value.getTime();
  },
});

const URL = new GraphQLScalarType({
  name: "URL",
  description: "The URL scalar type represents a Universal Resource Locator",

  parseLiteral(ast: any) {
    if (ast.kind === Kind.STRING) {
      return ast.value;
    }
    return null;
  },
  parseValue(value: string) {
    return value;
  },
  serialize(value: string) {
    return value;
  },
});

export const scalars = {
  DateTime,
  URL,
};
