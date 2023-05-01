import { createSchema } from 'graphql-yoga'
import fs from "fs"
 
export const schema = createSchema({
  typeDefs: fs.readFileSync(__dirname,"schema/schema.gql"),
  resolvers: {
      Query: {},
  }
})