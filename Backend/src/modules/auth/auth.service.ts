import bcrypt from "bcrypt";
import { registerRepository } from "./auth.repository";
import type { CreateUserData, RegisterUserInput } from "./auth.types";

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
