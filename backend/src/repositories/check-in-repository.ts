import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class CheckInRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    console.log(data);
    const checkIn = await prisma.checkIn.create({ data });
    return checkIn;
  }

  async findAll() {
    const checkIns = await prisma.checkIn.findMany();
    return checkIns;
  }

  async findById(id: string) {
    const checkIn = await prisma.checkIn.findUnique({ where: { id } });
    return checkIn;
  }

  async update(id: string, data: Prisma.CheckInUpdateInput) {
    const checkIn = await prisma.checkIn.update({ where: { id }, data });
    return checkIn;
  }

  async deleteById(id: string) {
    return await prisma.checkIn.delete({ where: { id } });
  }
}
