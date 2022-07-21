import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import * as userRepository from "../repositories/userRepository.js";

export async function createUser(user: userRepository.User) {
    const hashedPassword = await bcrypt.hash(user.password, 10);

    const existingUser = await userRepository.getUserbyEmail(user.email);
    if (existingUser) throw new Error("User already exists");

    await userRepository.createUser({
        ...user,
        password: hashedPassword
    });
}

export async function login(user: userRepository.User) {
    const existingUser = await userRepository.getUserbyEmail(user.email);
    if (!existingUser) throw new Error("User does not exist");

    const isValidPassword = await bcrypt.compare(user.password, existingUser.password);
    if (!isValidPassword) throw new Error("Invalid password");

    const token = jwt.sign({
        id: existingUser.id
    }, process.env.JWT_TOKEN!);

    return token;
}