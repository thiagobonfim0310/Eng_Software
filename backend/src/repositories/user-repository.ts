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
        environments: {
          // Inclui os ambientes do usuário
          include: {
            environment: true, // Inclui as informações do ambiente
          },
        },
        level: true, // Inclui as informações do nível associado ao usuário
      },
    });
    return users;
  }

  async updateUserEnvironment(id: string, environmentId: string) {
    const user = await prisma.user.findUnique({ where: { id } });
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

  async updateUserLevel(cpf: string, levelId: string) {
    const user = await prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;

    // Verifica se o Level existe
    const level = await prisma.level.findUnique({ where: { id: levelId } });
    if (!level) throw new Error("Level não encontrado.");

    // Atualiza o Level do usuário
    const updatedUser = await prisma.user.update({
      where: { cpf },
      data: { levelId },
    });

    return updatedUser;
  }

  async removeUserEnvironment(cpf: string, environmentId: string) {
    const user = await prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;

    const existingAssociation = await prisma.environmentUser.findUnique({
      where: {
        userId_environmentId: {
          userId: user.id,
          environmentId,
        },
      },
    });

    if (!existingAssociation) return null;

    await prisma.environmentUser.delete({
      where: {
        userId_environmentId: {
          userId: user.id,
          environmentId,
        },
      },
    });

    return true;
  }

  async removeUserLevel(cpf: string) {
    const user = await prisma.user.findUnique({ where: { cpf } });
    if (!user) return null;
  
    const updatedUser = await prisma.user.update({
      where: { cpf },
      data: { levelId: null }, // Remove o level associado
    });
  
    return updatedUser;
  }

  async findByTag(tag: string) {
    return await prisma.user.findFirst({
      where: { tag },
      include: {
        environments: {
          // Inclui os ambientes do usuário
          include: {
            environment: true, // Inclui as informações do ambiente
          },
        },
        level: true, // Inclui as informações do nível associado ao usuário
      },
    });
  }

  async deleteByCpf(cpf: string) {
    return await prisma.user.delete({ where: { cpf } });
  }
}
