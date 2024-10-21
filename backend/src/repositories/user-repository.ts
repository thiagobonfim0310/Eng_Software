// user-repository.ts
import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }

  async findAll() {
    const users = await prisma.user.findMany({
      include: {
        environments: { // Inclui os ambientes do usuário
          include: {
            environment: true, // Inclui as informações do ambiente
          },
        },
      },
    });
    return users;
  }

  async updateUserEnvironment(cpf: string, environmentId: string) {
    const user = await prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;

    // Verifica se já existe a associação para evitar duplicatas
    const existingAssociation = await prisma.environmentUser.findUnique({
      where: {
        userId_environmentId: {
          userId: user.id,
          environmentId,
        },
      },
    });

    if (!existingAssociation) {
      await prisma.environmentUser.create({
        data: {
          userId: user.id,
          environmentId,
        },
      });
    }

    return user; // Retorna o usuário atualizado ou o próprio objeto do usuário
  }

  async deleteByCpf(cpf: string) {
    return await prisma.user.delete({ where: { cpf } });
  }
}
