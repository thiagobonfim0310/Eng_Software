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

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      const deletedEnvironment = await environmentService.deleteById(id);
      if (deletedEnvironment) {
        return reply.code(200).send({ message: "Environment deletado com sucesso." });
      } else {
        return reply.status(404).send({ error: "Environment não encontrado." });
      }
    } catch (e) {
      console.error("Erro ao deletar environment:", e);
      return reply.status(500).send({ error: "Erro interno no servidor." });
    }
  });
}
