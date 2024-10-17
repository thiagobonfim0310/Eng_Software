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
}
