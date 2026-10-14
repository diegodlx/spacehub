import express from "express";
import { registerController } from "./auth.controller";
import { registerValidation } from "./auth.validation";

export const authRouter = express.Router();

authRouter.post("/register", registerValidation, registerController);
