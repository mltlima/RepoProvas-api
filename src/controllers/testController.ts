import { Request, Response } from "express";

import * as testService from "../services/testService.js";
import * as testRepository from "../repositories/testRepository.js";

export async function createTest(req: Request, res: Response) {
    const test = req.body;
    await testService.createTest(test);
    res.sendStatus(201);
}

export async function getTestbyDiscipline(req: Request, res: Response) {
    const disciplineId = req.params.disciplineId;
    const tests = await testRepository.getTestbyDiscipline(Number(disciplineId));
    res.status(200).json(tests);
}

export async function getTestbyCategory(req: Request, res: Response) {
    const categoryId = req.params.categoryId;
    const tests = await testRepository.getTestbyCategory(Number(categoryId));
    res.status(200).json(tests);
}

export async function getTestbyTeacherDiscipline(req: Request, res: Response) {
    const teacherDisciplineId = req.params.teacherDisciplineId;
    const tests = await testRepository.getTestbyTeacherDiscipline(Number(teacherDisciplineId));
    res.status(200).json(tests);
}