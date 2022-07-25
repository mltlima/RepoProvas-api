import { Request, Response } from "express";

import * as testService from "../services/testService.js";

export async function createTest(req: Request, res: Response) {
    const test = req.body;
    await testService.createTest(test);
    res.sendStatus(201);
}

export async function getTests(req: Request, res: Response) {
    const { groupBy } = req.query;
    const tests = await testService.getTests(JSON.stringify(groupBy));
    res.status(200).json({tests});
}