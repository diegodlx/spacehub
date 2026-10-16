import express from "express";
import { loginController, registerController } from "./auth.controller";
import { loginValidation, registerValidation } from "./auth.validation";
import { requireAuth } from "../../middlewares/require-auth";

export const authRouter = express.Router();

authRouter.post("/register", registerValidation, registerController);
authRouter.post("/login", loginValidation, loginController);
authRouter.get("/me", requireAuth, (_req, res) => {
    res.json(res.locals.auth);
});
