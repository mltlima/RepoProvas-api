import { Request, Response } from "express";

import * as userService from "../services/userService.js";

export async function signUp(req: Request, res: Response) {
    const { email, password } = req.body;
    const user = await userService.createUser({ email, password });
    res.status(201).json(user);
}

export async function signIn(req: Request, res: Response) {
    const { email, password } = req.body;
    const token = await userService.login({ email, password });
    res.status(200).send({ token });
}