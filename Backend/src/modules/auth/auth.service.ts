import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByEmail, registerRepository } from "./auth.repository";
import type { CreateUserData, LoginUserInput, RegisterUserInput } from "./auth.types";

export async function registerService(input: RegisterUserInput) {
    const user: CreateUserData = {
        nome: input.nome.trim(),
        perfil: input.perfil,
        email: input.email.trim().toLowerCase(),
        senha_hash: await bcrypt.hash(input.senha, 12),
        telefone: input.telefone?.trim() || null,
        data_nascimento: input.data_nascimento || null,
        foto_perfil: input.foto_perfil?.trim() || null,
    };

    return registerRepository(user);
}

export async function loginService(input: LoginUserInput) {
    const email = input.email.trim().toLowerCase();
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(input.senha, user.senha_hash))) {
        return null;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
        throw new Error("JWT_SECRET must contain at least 32 bytes.");
    }

    const expiresIn = 3600;
    const token = jwt.sign(
        { perfil: user.perfil },
        secret,
        { algorithm: "HS256", subject: user.id, issuer: "spacehub", expiresIn }
    );

    return {
        token,
        tokenType: "Bearer",
        expiresIn,
        user: { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil },
    };
}
