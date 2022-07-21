import { Router } from "express";

import * as authController from "../controllers/authController.js";
import schemas from "../schemas/schemas.js";
import { validateSchema } from "../middlewares/schemaMiddleware.js";

const authRouter = Router();

authRouter.post("/signup", validateSchema(schemas.createUserSchema), authController.signUp);
authRouter.post("/signin", validateSchema(schemas.loginUserSchema), authController.signIn);

export default authRouter;