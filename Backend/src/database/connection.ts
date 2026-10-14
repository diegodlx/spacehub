
import "dotenv/config";
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error("DATABASE_URL não foi configurada.");
}

export const pool = new Pool({
    connectionString,
    max: 5,
    connectionTimeoutMillis: 1000,
    idleTimeoutMillis: 3000
});

pool.on("error", () => {
    console.error("Erro em uma conexão ociosa com o banco.");
});