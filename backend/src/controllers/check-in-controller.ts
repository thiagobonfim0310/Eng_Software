import { FastifyInstance } from "fastify";
import { CheckInRepository } from "../repositories/check-in-repository";
import { CheckInService } from "../services/check-in-service";

export async function checkInController(app: FastifyInstance) {
  const checkInRepository = new CheckInRepository();
  const checkInService = new CheckInService(checkInRepository);

  app.get("/", async (request, reply) => {
    try {
      const checkIns = await checkInService.listAll();
      return reply.code(200).send(checkIns);
    } catch (e) {
      return reply.status(405).send();
    }
  });

  app.delete("/:id", async (request, reply) => {
    const { id } = request.params as { id: string };

    try {
      await checkInService.deleteById(id);
      return reply.code(200).send();
    } catch (e) {
      return reply.status(405).send();
    }
  });
}
