import type { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { HTTP_STATUS } from "../constants/http-status";

export const requireAuth: RequestHandler = (req, res, next) => {
    const cookie = req.headers.cookie?.match(/(?:^|;\s*)spacehub_session=([^;]+)/)?.[1];
    if (!cookie) {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Faça login para continuar." });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
        next(new Error("JWT_SECRET must contain at least 32 bytes."));
        return;
    }

    try {
        const payload = jwt.verify(cookie, secret, { algorithms: ["HS256"], issuer: "spacehub" });
        if (typeof payload === "string" || typeof payload.sub !== "string" ||
            (payload.perfil !== "host" && payload.perfil !== "cliente")) {
            throw new Error("Invalid JWT payload");
        }
        res.locals.auth = { userId: payload.sub, perfil: payload.perfil };
        next();
    } catch {
        res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Sessão inválida ou expirada. Faça login novamente." });
    }
};
