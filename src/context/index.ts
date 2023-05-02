import { createPubSub } from '@graphql-yoga/subscription'
import { db } from '../db'
 
// 1
type PubSubChannels = {
    CVUpdates
}
 
// 2
const pubSub = createPubSub<PubSubChannels>()


export const context = {
    db,
    pubSub,
}


 