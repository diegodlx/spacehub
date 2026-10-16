import type { RequestHandler } from "express";
import { z } from "zod";
import { HTTP_STATUS } from "../../constants/http-status";

const optionalText = (maxLength: number) =>
    z.preprocess(
        (value) => value === "" ? null : value,
        z.string().trim().max(maxLength).nullish()
    );

export const registerSchema = z.object({
    nome: z.string().trim().min(1).max(150),
    perfil: z.enum(["host", "cliente"]),
    email: z.email().max(255),
    senha: z.string().min(8),
    telefone: optionalText(20),
    data_nascimento: z.preprocess(
        (value) => value === "" ? null : value,
        z.iso.date().nullish()
    ),
    foto_perfil: z.preprocess(
        (value) => value === "" ? null : value,
        z.url().max(500).refine((value) => /^https?:\/\//i.test(value)).nullish()
    ),
});

export const loginSchema = z.object({
    email: z.email().max(255),
    senha: z.string().min(1),
});

export const registerValidation: RequestHandler = (req, res, next) => {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({
            message: "Dados de cadastro inválidos.",
            errors: result.error.issues.map(({ path, message }) => ({
                field: path.join("."),
                message,
            })),
        });
        return;
    }

    req.body = result.data;
    next();
};

export const loginValidation: RequestHandler = (req, res, next) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Informe um e-mail e uma senha válidos." });
        return;
    }

    req.body = result.data;
    next();
};
