import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class LockRepository {
  async create(data: Prisma.LockCreateInput) {
    const lock = await prisma.lock.create({ data });
    return lock;
  }
  async findAll() {
    const locks = await prisma.lock.findMany();
    return locks;
  }
  async deleteById(id: string) {
    return await prisma.lock.delete({ where: { id } });
  }
  async updateLockEnvironment(id: string, environmentId: string) {
    return await prisma.lock.update({
      where: { id },
      data: { environmentId },
    });
  }
  async findByName(name: string) {
    return await prisma.lock.findFirst({
      where: { name },
      include: { environment: true },
    });
  }

  async findById(id: string) {
    return await prisma.lock.findUnique({
      where: { id },
    });
  }

  async deleteEnvironmentFromLock(lockId: string, environmentId: string) {
    return await prisma.lock.update({
        where: { id: lockId },
        data: { environmentId: null } // Remove a relação definindo como null
    });
  }
}
