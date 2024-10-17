import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class EnvironmentRepository {
  async create(data: Prisma.EnvironmentCreateInput) {
    const environment = await prisma.environment.create({ data });
    return environment;
  }
  async findAll() {
    const environments = await prisma.environment.findMany();
    return environments;
  }
}
