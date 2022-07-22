import { Request, Response } from "express";

import * as disciplineRepository from "../repositories/disciplineRepository.js";

export async function getAllDisciplines(req: Request, res: Response) {
    const disciplines = await disciplineRepository.getAllDisciplines();
    res.status(200).json(disciplines);
}

export async function getDisciplinebyTermId(req: Request, res: Response) {
    const termId = req.params.termId;
    const disciplines = await disciplineRepository.getDisciplinebyTermId(Number(termId));
    res.status(200).json(disciplines);
}

export async function getAllTermIds(req: Request, res: Response) {
    const termIds = await disciplineRepository.getAllTermIds();
    res.status(200).json(termIds);
}