import { pool } from "../../database/connection";
import type { CreateUserData, LoginUserRecord } from "./auth.types";

export async function registerRepository(user: CreateUserData) {
    const result = await pool.query(
        `INSERT INTO usuarios (
            nome, perfil, email, telefone, data_nascimento,
            senha_hash, foto_perfil, criado_em
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
        RETURNING id, nome, perfil, email, telefone, data_nascimento,
                  foto_perfil, criado_em`,
        [
            user.nome,
            user.perfil,
            user.email,
            user.telefone ?? null,
            user.data_nascimento ?? null,
            user.senha_hash,
            user.foto_perfil ?? null,
        ]
    );

    return result.rows[0];
}

export async function findUserByEmail(email: string): Promise<LoginUserRecord | null> {
    const result = await pool.query<LoginUserRecord>(
        "SELECT id, nome, email, perfil, senha_hash FROM usuarios WHERE email = $1",
        [email]
    );

    return result.rows[0] ?? null;
}
