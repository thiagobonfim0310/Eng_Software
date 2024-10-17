import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";

export class UserRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({ data });
    return user;
  }
  async findAll() {
    const users = await prisma.user.findMany();
    return users;
  }
}
