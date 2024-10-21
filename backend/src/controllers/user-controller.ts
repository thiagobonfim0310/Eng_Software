// user-controller.ts
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
      console.error("Erro ao listar usuários:", e);
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

  // Rota PUT para atualizar os ambientes do usuário
  app.put("/:cpf", async (request, reply) => {
    const { cpf } = request.params as { cpf: string }; // Captura do CPF via path params
    const updateBodySchema = z.object({
      environmentId: z.string(),
    });
    const { environmentId } = updateBodySchema.parse(request.body); // Captura do ID do ambiente via corpo da requisição

    try {
      const updatedUser = await userService.updateUserEnvironment(cpf, environmentId);
      if (updatedUser) {
        return reply.code(200).send({ message: "Ambiente do usuário atualizado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao atualizar ambiente do usuário:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  // Rota DELETE que recebe o CPF no corpo da requisição
  app.delete("/:cpf", async (request, reply) => {
    const { cpf } = request.params as { cpf: string }; // Captura do CPF via path params

    try {
      const deletedUser = await userService.deleteByCpf(cpf);
      if (deletedUser) {
        return reply.code(200).send({ message: "Usuário deletado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao deletar usuário:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });
}
