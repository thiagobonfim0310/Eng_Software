import { FastifyInstance } from "fastify";
import { LevelRepository } from "../repositories/level-repository";
import { LevelService } from "../services/level-service";
import { z } from "zod";

export async function levelsController(app: FastifyInstance) {
  const levelRepository = new LevelRepository();
  const levelService = new LevelService(levelRepository);

  app.get("/", async (request, reply) => {
    try {
      const levels = await levelService.listAll();
      return reply.code(200).send(levels);
    } catch (e) {
      return reply.status(405).send();
    }
  });

  app.post("/", async (request, reply) => {
    const registerBodySchema = z.object({
      name: z.string(),
    });
    const { name } = registerBodySchema.parse(request.body);

    try {
      await levelService.register({ name });
    } catch (e) {
      return reply.status(409).send();
    }
    return reply.code(201).send();
  });

  // Rota PUT para associar um Environment a um Level
  app.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const updateBodySchema = z.object({
      environmentId: z.string(),
    });
    const { environmentId } = updateBodySchema.parse(request.body);

    try {
      const updatedLevel = await levelService.assignEnvironment(id, environmentId);
      if (updatedLevel) {
        return reply.code(200).send({ message: "Ambiente atribuído ao Level com sucesso." });
      } else {
        return reply.status(404).send({ error: "Level não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao atribuir ambiente ao level:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  app.delete("/:id/:environmentId", async (request, reply) => {
    const { id } = request.params as { id: string };

    const { environmentId } = request.params as { environmentId: string };
  
    try {
      const result = await levelService.removeEnvironment(id, environmentId);
      if (result) {
        return reply.code(200).send({ message: "Ambiente removido do Level com sucesso." });
      } else {
        return reply.status(404).send({ error: "Associação não encontrada ou Level inexistente." });
      }
    } catch (e) {
      console.error("Erro ao remover ambiente do level:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const deletedLevel = await levelService.deleteById(id);
      if (deletedLevel) {
        return reply.code(200).send({ message: "Level deletado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Level não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao deletar level:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });
}
