import type { z } from "zod";
import type { registerSchema } from "./auth.validation";

export type RegisterUserInput = z.output<typeof registerSchema>;

export interface CreateUserData {
    nome: string;
    perfil: "host" | "cliente";
    email: string;
    senha_hash: string;
    telefone?: string | null;
    data_nascimento?: string | null;
    foto_perfil?: string | null;
}
