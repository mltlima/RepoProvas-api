import { Request, Response } from "express";

import * as categoryRepository from "../repositories/categoryRepository.js";


export async function getAllCategories(req: Request, res: Response) {
    const categories = await categoryRepository.getAllCategories();
    res.status(200).json({categories});
}