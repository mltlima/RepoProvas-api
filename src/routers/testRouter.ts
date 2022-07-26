import { Router } from "express";

import * as testController from "../controllers/testController.js";
import schemas from "../schemas/schemas.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const testRouter = Router();

testRouter.use(validateToken);

testRouter.post("/test", validateSchema(schemas.testSchema), testController.createTest);
testRouter.get("/tests", testController.getTests);

export default testRouter;