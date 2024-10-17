import "dotenv/config";
import { z } from "zod";

const envShema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  //coerce para converter
  PORT: z.coerce.number().default(3333),
});

const _env = envShema.safeParse(process.env);

if (_env.success === false) {
  console.error("Invalid enviorment variables", _env.error.format());

  throw new Error("Invalid enviorment variables");
}

export const env = _env.data;
