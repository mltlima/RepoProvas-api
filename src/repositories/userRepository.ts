import prisma from '../database.js';
import { users } from "@prisma/client";

export type User = Omit <users, 'id'>;
/*
export interface User {
    email: string;
    password: string;
}
*/
export async function getUserbyId(id: number) {
    return prisma.users.findFirst({
        where: {
            id
        }
    });
}

export async function getUserbyEmail(email: string) {
    return prisma.users.findFirst({
        where: {
            email
        }
    });
}

export async function createUser(user: User) {
    return prisma.users.create({
        data: {
            email: user.email,
            password: user.password
        }
    });
}