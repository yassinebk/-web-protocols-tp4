import { context } from "../context";

const  CV= {
        user: (parent, _, {db}:typeof context) => {
            const user = db.users.find((user) => user.id === parent.user.id);
            
            if (!user) {
                throw new Error(`User with ID ${parent.userId} not found`);
            }
            return user;
        },
        skills: (parent, args, context) => {
            const { db } = context;
            const skills = db.skills.filter((skill) => {
                return skill.cvs.some((cv) => cv.id === parent.id);
            });
            return skills;
        },
    }
export default CV