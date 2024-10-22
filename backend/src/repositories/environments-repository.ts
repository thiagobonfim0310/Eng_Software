import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class EnvironmentRepository {
  async create(data: Prisma.EnvironmentCreateInput) {
    const environment = await prisma.environment.create({ data });
    return environment;
  }
  async findAll() {
    const environments = await prisma.environment.findMany({
      include: {
        subEnvironments: true,
      },
    });
    return environments;
  }

  async deleteById(id: string) {
    return await prisma.environment.delete({ where: { id } });
  }

  async findById(id: string) {
    return await prisma.environment.findUnique({ where: { id } });
  }
}
