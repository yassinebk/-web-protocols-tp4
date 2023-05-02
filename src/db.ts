interface IdentifiableById {
  id: number;
}

interface CV extends IdentifiableById {
  name: string;
  age: string;
  job: string;
  skills: Skill[];
  user: User;
}

interface Skill extends IdentifiableById {
  designation: string;
  cvs: CV[];
}

interface User extends IdentifiableById {
  name: string;
  email: string;
  role: Role;
  cvs: CV[];
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
    skills: [skills[0]],
    user: users[0],
  },
  {
    id: 2,
    name: "Jane Doe",
    age: "25",
    job: "Java Developer",
    skills: [skills[1]],
    user: users[1],
  },
];

skills[0].cvs.push(cvs[0]);
skills[1].cvs.push(cvs[1]);
users[0].cvs.push(cvs[0]);
users[1].cvs.push(cvs[1]);


export const db = {
  skills,
  users,
  cvs,
};
