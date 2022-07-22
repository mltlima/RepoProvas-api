import { Request, Response } from "express";


import * as categoryService from "../services/categoryService.js";

export async function getCategoryByName(req: Request, res: Response) {
    const name = req.params.name;
    const category = await categoryService.getCategoryByName(name);
    res.status(200).json(category);
}