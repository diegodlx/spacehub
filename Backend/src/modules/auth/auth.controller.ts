import type { RequestHandler } from "express";
import { HTTP_STATUS } from "../../constants/http-status";
import { loginService, registerService } from "./auth.service";
import type { LoginUserInput, RegisterUserInput } from "./auth.types";

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

export const loginController: RequestHandler = async (req, res) => {
    try {
        const result = await loginService(req.body as LoginUserInput);

        if (!result) {
            res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "E-mail ou senha incorretos." });
            return;
        }

        res.cookie("spacehub_session", result.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: result.expiresIn * 1000,
            path: "/",
        });
        res.status(HTTP_STATUS.OK).json({ user: result.user });
    } catch (error) {
        console.error("Erro ao autenticar usuário:", error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Não foi possível entrar na conta." });
    }
};
