import "dotenv/config";
import { createApp } from "./app";

const port = Number(process.env.PORT);

if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT deve ser um número entre 1 e 65535.");
};

const app = createApp();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
