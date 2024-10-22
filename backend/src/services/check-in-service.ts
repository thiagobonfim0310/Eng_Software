import { Prisma } from "@prisma/client";
import { CheckInRepository } from "../repositories/check-in-repository";

export class CheckInService {
  constructor(private checkInRepository: CheckInRepository) {}

  async register(data: Prisma.CheckInUncheckedCreateInput) {
    return await this.checkInRepository.create(data);
  }

  async listAll() {
    return await this.checkInRepository.findAll();
  }

  async findById(id: string) {
    return await this.checkInRepository.findById(id);
  }

  async update(id: string, data: Prisma.CheckInUpdateInput) {
    return await this.checkInRepository.update(id, data);
  }

  async deleteById(id: string) {
    return await this.checkInRepository.deleteById(id);
  }
}
