import type { z } from "zod";
import type { loginSchema, registerSchema } from "./auth.validation";

export type RegisterUserInput = z.output<typeof registerSchema>;
export type LoginUserInput = z.output<typeof loginSchema>;

export interface LoginUserRecord {
    id: string;
    nome: string;
    email: string;
    perfil: "host" | "cliente";
    senha_hash: string;
}

export interface CreateUserData {
    nome: string;
    perfil: "host" | "cliente";
    email: string;
    senha_hash: string;
    telefone?: string | null;
    data_nascimento?: string | null;
    foto_perfil?: string | null;
}
