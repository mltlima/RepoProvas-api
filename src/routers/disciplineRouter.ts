import { Router } from "express";

import * as disciplineController from "../controllers/disciplineController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const disciplineRouter = Router();

disciplineRouter.use(validateToken);

disciplineRouter.get("/disciplines", disciplineController.getAllDisciplines);
disciplineRouter.get("/disciplines/term/:termId", disciplineController.getDisciplinebyTermId);
disciplineRouter.get("/terms", disciplineController.getAllTermIds);

export default disciplineRouter;