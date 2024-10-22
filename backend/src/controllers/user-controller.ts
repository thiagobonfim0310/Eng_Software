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
  app.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string }; // Captura do id via path params
    const updateBodySchema = z.object({
      environmentId: z.string(),
    });
    const { environmentId } = updateBodySchema.parse(request.body); // Captura do ID do ambiente via corpo da requisição
    console.log(environmentId);
    try {
      const updatedUser = await userService.updateUserEnvironment(
        id,
        environmentId
      );
      if (updatedUser) {
        return reply
          .code(200)
          .send({ message: "Ambiente do usuário atualizado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao atualizar ambiente do usuário:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  app.put("/:cpf/level", async (request, reply) => {
    const { cpf } = request.params as { cpf: string };
    const updateBodySchema = z.object({
      levelId: z.string(),
    });

    const { levelId } = updateBodySchema.parse(request.body);

    try {
      const updatedUser = await userService.updateUserLevel(cpf, levelId);
      if (updatedUser) {
        return reply
          .code(200)
          .send({ message: "Level do usuário atualizado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao atualizar level do usuário:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  app.delete("/:cpf/environments/:environmentId", async (request, reply) => {
    const { cpf, environmentId } = request.params as {
      cpf: string;
      environmentId: string;
    };

    try {
      const result = await userService.removeUserEnvironment(
        cpf,
        environmentId
      );
      if (result) {
        return reply
          .code(200)
          .send({ message: "Ambiente removido do usuário com sucesso." });
      } else {
        return reply
          .status(404)
          .send({ error: "Associação não encontrada ou usuário inexistente." });
      }
    } catch (e) {
      console.error("Erro ao remover ambiente do usuário:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  // Rota DELETE que recebe o CPF no corpo da requisição
  app.delete("/:cpf", async (request, reply) => {
    const { cpf } = request.params as { cpf: string }; // Captura do CPF via path params

    try {
      const deletedUser = await userService.deleteByCpf(cpf);
      if (deletedUser) {
        return reply
          .code(200)
          .send({ message: "Usuário deletado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Usuário não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao deletar usuário:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });
}
