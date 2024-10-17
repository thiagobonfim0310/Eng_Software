import { Environment } from "@prisma/client";
import { LockRepository } from "../repositories/lock-repository";

interface Lock {
  name: string;
}

export class LockService {
  constructor(private lockRepository: LockRepository) {}
  async register({ name }: Lock) {
    await this.lockRepository.create({ name });
  }

  async listAll() {
    return await this.lockRepository.findAll();
  }
}
