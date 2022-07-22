import { Router } from "express";

import * as categoryController from "../controllers/categoryController.js";
import schemas from "../schemas/schemas.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const categoryRouter = Router();

categoryRouter.use(validateToken);

categoryRouter.get("/categories", validateSchema(schemas.categorySchema),categoryController.getCategoryByName);

export default categoryRouter;