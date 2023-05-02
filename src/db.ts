interface IdentifiableById {
  id: number;
}

interface CV extends IdentifiableById {
  name: string;
  age: string;
  job: string;
  skills: number[];
  userId: number;
}

interface Skill extends IdentifiableById {
  designation: string;
  cvs: number[];
}

interface User extends IdentifiableById {
  name: string;
  email: string;
  role: Role;
  cvs: number[];
}

enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
}

const skills: Skill[] = [
  { id: 1, designation: "JavaScript Developer", cvs: [] },
  { id: 2, designation: "Java Developer", cvs: [] },
  { id: 3, designation: "Python Developer", cvs: [] },
  { id: 4, designation: "Data Scientist", cvs: [] },
];

const users: User[] = [
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    role: Role.ADMIN,
    cvs: [],
  },
  {
    id: 2,
    name: "Jane",
    email: "jane@example.com",
    role: Role.USER,
    cvs: [],
  },
];

const cvs: CV[] = [
  {
    id: 1,
    name: "John Doe",
    age: "30",
    job: "JavaScript Developer",
    skills: [skills[0].id],
    userId: users[0].id,
  },
  {
    id: 2,
    name: "Jane Doe",
    age: "25",
    job: "Java Developer",
    skills: [skills[1].id],
    userId: users[1].id,
  },
];

skills[0].cvs.push(cvs[0].id);
skills[1].cvs.push(cvs[1].id);
users[0].cvs.push(cvs[0].id);
users[1].cvs.push(cvs[1].id);


export const db = {
  skills,
  users,
  cvs,
};
