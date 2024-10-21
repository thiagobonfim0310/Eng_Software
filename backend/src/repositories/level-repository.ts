import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class LevelRepository {
  async create(data: Prisma.LevelCreateInput) {
    const level = await prisma.level.create({ data });
    return level;
  }

  async findAll() {
    const levels = await prisma.level.findMany({
        include: {
          environments: { // Inclui os ambientes do usuário
            include: {
              environment: true, // Inclui as informações do ambiente
            },
          },
        },
      });
    
    return levels;
  }

  async assignEnvironment(levelId: string, environmentId: string) {
    const level = await prisma.level.findUnique({ where: { id: levelId } });
    if (!level) return null;

    // Verifica se a associação já existe
    const existingAssociation = await prisma.levelEnvironment.findUnique({
      where: {
        levelId_environmentId: {
          levelId,
          environmentId,
        },
      },
    });

    if (!existingAssociation) {
      await prisma.levelEnvironment.create({
        data: {
          levelId,
          environmentId,
        },
      });
    }

    return level;
  }

  async removeEnvironment(levelId: string, environmentId: string) {
    const level = await prisma.level.findUnique({ where: { id: levelId } });
    if (!level) return null;
  
    const existingAssociation = await prisma.levelEnvironment.findUnique({
      where: {
        levelId_environmentId: {
          levelId,
          environmentId,
        },
      },
    });
  
    if (!existingAssociation) return null;
  
    await prisma.levelEnvironment.delete({
      where: {
        levelId_environmentId: {
          levelId,
          environmentId,
        },
      },
    });
  
    return true;
  }
  

  async deleteById(id: string) {
    return await prisma.level.delete({ where: { id } });
  }
}
