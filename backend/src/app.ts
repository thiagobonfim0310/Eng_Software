import fastify from "fastify";
import { appRoutes } from "./routes/routes";
import dotenv from "dotenv";
import cors from "@fastify/cors";

dotenv.config();

export const app = fastify();

app.register(cors, {
  origin: "*", // Permitir todas as origens, ajuste conforme necessário
});

app.register(appRoutes);
