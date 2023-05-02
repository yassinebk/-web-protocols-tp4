import { createSchema } from 'graphql-yoga'
import fs from "fs"
import path from "path"
import Mutation from './mutations'
import Query from './queries'
import { Subscription } from './subscriptions'
import CV from './queries/CV'
 
export const schema = createSchema({
  typeDefs: fs.readFileSync(path.join(__dirname,"schemas/schema.graphql"),"utf-8"),
  resolvers: {
    CV,
    Query,
    Mutation,
    Subscription,
  }
})