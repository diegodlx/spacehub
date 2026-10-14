import type { RequestHandler } from "express";
import { HTTP_STATUS } from "../../constants/http-status";
import { registerService } from "./auth.service";
import type { RegisterUserInput } from "./auth.types";

export const registerController: RequestHandler = async (req, res) => {
    try {
        const user = await registerService(req.body as RegisterUserInput);
        res.status(HTTP_STATUS.CREATED).json(user);
    } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
            res.status(HTTP_STATUS.CONFLICT).json({ message: "Este e-mail já está cadastrado." });
            return;
        }
        console.error("Erro ao cadastrar usuário:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Não foi possível criar a conta." });
    }
};
