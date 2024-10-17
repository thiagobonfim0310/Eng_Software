import { FastifyInstance } from "fastify";
import { LockRepository } from "../repositories/lock-repository";
import { LockService } from "../services/lock-service";
import { z } from "zod";

export async function lockRoutes(app: FastifyInstance) {
  app.get("/", async (request, reply) => {
    const lockRepository = new LockRepository();
    const lockService = new LockService(lockRepository);
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
    const lockRepository = new LockRepository();
    const lockService = new LockService(lockRepository);
    try {
      await lockService.register({ name });
    } catch (e) {
      return reply.status(409).send();
    }
    return reply.code(201).send();
  });
}
