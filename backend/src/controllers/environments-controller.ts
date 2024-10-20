import { FastifyInstance } from "fastify";
import { EnvironmentRepository } from "../repositories/environments-repository";
import { EnvironmentService } from "../services/environments-service";
import { z } from "zod";

export async function environmentsController(app: FastifyInstance) {
  const environmentsRepository = new EnvironmentRepository();
  const environmentService = new EnvironmentService(environmentsRepository);

  app.get("/", async (request, reply) => {
    try {
      const environments = await environmentService.listAll();
      return reply.code(200).send(environments);
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
      await environmentService.register({ name });
    } catch (e) {
      return reply.status(409).send();
    }
    return reply.code(201).send();
  });
}
