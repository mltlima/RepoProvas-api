import { Router } from "express";

import * as categoryController from "../controllers/categoryController.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.use(validateToken);

categoryRouter.get("/categories", categoryController.getAllCategories);

export default categoryRouter;