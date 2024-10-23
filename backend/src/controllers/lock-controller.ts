import { FastifyInstance } from "fastify";
import { LockRepository } from "../repositories/lock-repository";
import { LockService } from "../services/lock-service";
import { z } from "zod";
import { UserRepository } from "../repositories/user-repository";
import { EnvironmentRepository } from "../repositories/environments-repository";
import { CheckInRepository } from "../repositories/check-in-repository";

export async function lockRoutes(app: FastifyInstance) {
  const lockRepository = new LockRepository();
  const userRespository = new UserRepository();
  const environmentRespository = new EnvironmentRepository();
  const checkInRepository = new CheckInRepository();
  const lockService = new LockService(
    lockRepository,
    userRespository,
    environmentRespository,
    checkInRepository
  );
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

  app.put("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };
    const updateBodySchema = z.object({
      environmentId: z.string(),
    });
    const { environmentId } = updateBodySchema.parse(request.body);

    try {
      const updateLock = await lockService.updateLockEnvironment(
        id,
        environmentId
      );
      if (updateLock) {
        return reply
          .code(200)
          .send({ message: "Ambiente do lock atualizado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Lock não encontrado " });
      }
    } catch (e) {
      console.error("Erro ao associar  lock:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });

  app.delete("/:lockId/environments/:environmentId", async (request, reply) => {
    const { lockId, environmentId } = request.params as { lockId: string; environmentId: string };

    try {
        const deletedEnvironment = await lockService.deleteEnvironmentFromLock(lockId, environmentId);
        if (deletedEnvironment) {
            return reply.code(200).send({ message: "Ambiente removido do lock com sucesso." });
        } else {
            return reply.status(404).send({ error: "Lock ou ambiente não encontrado." });
        }
    } catch (e) {
        console.error("Erro ao remover ambiente do lock:", e);
        return reply.status(500).send({ error: "Erro interno no servidor." });
    }
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
