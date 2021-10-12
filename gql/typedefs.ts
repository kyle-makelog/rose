import { gql } from "apollo-server-micro";

export const typeDefs = gql`
  scalar Document
  scalar DateTime
  scalar URL

  enum Visibility {
    internal
    public
    private
  }

  type Channel {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    name: String!

    ## refs
    ##

    published: [Publish!]!
  }

  type Organization {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    name: String!
    visibility: Visibility!

    ## refs
    ##

    templates: [Template!]!
    projects: [Project!]!
    updates: [Update!]!
  }

  type Person {
    avatar: URL!
    email: ID!
    name: String!
  }

  type Project {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    name: String!
    visibility: Visibility!

    ## refs
    ##

    organization: Organization!
    templates: [Template!]!
    updates: [Update!]!
  }

  type Publish {
    id: ID!
    createdAt: DateTime!

    content: String!
    status: String!

    ##  refs
    ##
    channel: Channel!
    update: Update!
  }

  type Update {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    content: Document!
    name: String!
    visibility: Visibility!

    ## refs
    ##

    authors: [Person!]!
    organization: Organization!
    project: Project!
    published: [Publish!]!
  }

  type Template {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!

    content: Document!
    name: String!

    ## refs
    ##

    authors: [Person!]!
    organization: Organization!
    project: Project
  }

  type Query {
    organization(id: ID!): Organization
    organizations: [Organization!]!
    projects(organization: ID!): [Project!]!
    templates(organization: ID!, project: ID): [Template!]!
    updates(organization: ID!, project: ID): [Update!]!
  }
  type Mutation {
    setProject(organization: ID, name: String!, id: ID): Project!
    setTemplate(
      organization: ID!
      content: Document!
      name: String!
      id: ID
      project: ID
    ): [Template!]!
    setUpdate(organization: ID!, project: ID): [Update!]!
  }
`;
