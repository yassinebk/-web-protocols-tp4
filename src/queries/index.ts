import { GraphQLError } from "graphql";
import { context } from "../context";

const Query = {
    allCVs: (_, __, context) => {

        const { db } = context;
        return db.cvs;
    },
    oneCV: (_, args, { db }:typeof context) => {
        const { id } = args;
        const foundCV = db.cvs.find((cv) => cv.id === id);
        if (!foundCV) throw new GraphQLError("CV not found");
        return foundCV;
    },

    allSkills: (_, __, context) => {
        const { db } = context;
        return db.skills;
    },
}



export default Query





