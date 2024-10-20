import { FastifyInstance } from "fastify";
import { z } from "zod";
import { UserRepository } from "../repositories/user-repository";
import { UserService } from "../services/user-services";

export async function userRoutes(app: FastifyInstance) {
  const userRepository = new UserRepository();
  const userService = new UserService(userRepository);
  app.get("/", async (request, reply) => {
    try {
      const users = await userService.listAll();
      return reply.code(200).send(users);
    } catch (e) {
      return reply.status(405).send();
    }
  });

  app.post("/", async (request, reply) => {
    const registerBodySchema = z.object({
      name: z.string(),
      tag: z.string(),
      cpf: z.string(),
    });
    const { name, tag, cpf } = registerBodySchema.parse(request.body);

    try {
      await userService.register({ name, tag, cpf });
    } catch (e) {
      return reply.status(409).send();
    }
    return reply.code(201).send();
  });

  //app.get("/:id", async (request, reply) => {
  // app.put("/:id", async (request, reply) => {
  //app.delete("/:id", async (request, reply) => {
}
