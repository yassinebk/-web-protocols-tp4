import { context } from "../context";

const Mutation = {
  createCV: (_parent:never, { input }:any, { pubSub, db }: typeof context) => {
    const { name, age, job, skillIds, userId } = input;
    const id = db.cvs.length + 1;
    const skills = db.skills.filter((skill) => skillIds.includes(skill.id)).map(s=>s.id)
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const newCV = {
      id,
      name,
      age,
      job,
      skills,
      userId:user.id,
    };
    db.cvs.push(newCV);

    pubSub.publish('CVUpdates',newCV);

    return newCV;
  },
  updateCV: (_parent:never, { input }:any, { pubSub, db }: typeof context) => {
    const { id, name, age, job, skillIds, userId } = input;
    const cvIndex = db.cvs.findIndex((cv) => cv.id === id);
    if (cvIndex === -1) {
      throw new Error(`CV with ID ${id} not found.`);
    }
    const skills = db.skills.filter((skill) => skillIds.includes(skill.id));
    const user = db.users.find((user) => user.id === userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found.`);
    }

    const updatedCV = {
      ...db.cvs[cvIndex],
      name: name ?? db.cvs[cvIndex].name,
      age: age ?? db.cvs[cvIndex].age,
      job: job ?? db.cvs[cvIndex].job,
      skills:skills.map(s=>s.id),
      user:user.id,
    };
    db.cvs[cvIndex] = updatedCV;
    pubSub.publish('CVUpdates',updatedCV);
    return updatedCV;
  },
  deleteCV: (_parent: never, { id }: { id: number }, { db, pubSub }: typeof context) => {
    const index = db.cvs.findIndex((cv) => cv.id === id);
    if (index === -1) {
      throw new Error(`CV with ID ${id} not found`);
    }
    const deletedCV = db.cvs.splice(index, 1)[0];

    // Remove the CV from the skills table
    db.skills.forEach((cvSkill) => {
      if (cvSkill.id === id) {
        const skillIndex = db.skills.findIndex((skill) => skill.id === cvSkill.id);
        if (skillIndex !== -1) {
          db.skills[skillIndex].cvs = db.skills[skillIndex].cvs.filter((cvId) => cvId !== id);
        }
      }
    });
    db.skills = db.skills.filter((cvSkill) => cvSkill.id !== id);

    // Remove the CV from the user's CVs
    const userIndex = db.users.findIndex((user) => user.id === deletedCV.userId);
    if (userIndex !== -1) {
      db.users[userIndex].cvs = db.users[userIndex].cvs.filter((cvId) => cvId !== id);
    }

    pubSub.publish('CVUpdates',deletedCV);
    return true;
  }
}


export default Mutation