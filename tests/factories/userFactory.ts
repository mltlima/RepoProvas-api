import bcrypt from 'bcrypt';
import { faker } from "@faker-js/faker";
import prisma from '../../src/database.js';

export async function createUser() {
    const user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
    };
  
    await prisma.users.create({
      data: {
        email: user.email,
        password: bcrypt.hashSync(user.password, 10),
      },
    });
  
    return user;
  }