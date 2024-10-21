import { FastifyInstance } from "fastify";
import { LockRepository } from "../repositories/lock-repository";
import { LockService } from "../services/lock-service";
import { z } from "zod";

export async function lockRoutes(app: FastifyInstance) {
  const lockRepository = new LockRepository();
  const lockService = new LockService(lockRepository);
  app.get("/", async (request, reply) => {
    try {
      const locks = await lockService.listAll();
      return reply.code(200).send(locks);
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
      await lockService.register({ name });
    } catch (e) {
      return reply.status(409).send();
    }
    return reply.code(201).send();
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const deletedLock = await lockService.deleteById(id);
      if (deletedLock) {
        return reply.code(200).send({ message: "Lock deletado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Lock não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao deletar lock:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });
}
