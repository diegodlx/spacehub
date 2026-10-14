import express from "express";
import { authRouter } from "./modules/auth/auth.routes";
import cors from "cors";

export function createApp() {
    const app = express();

    app.use(cors());

    app.use(express.json());

    app.use("/auth", authRouter);


    return app
}