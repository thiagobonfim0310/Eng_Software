import { EnvironmentRepository } from "../repositories/environments-repository";

interface Environment {
  name: string;
}

export class EnvironmentService {
  constructor(private environmentRepository: EnvironmentRepository) {}

  async register({ name }: Environment) {
    await this.environmentRepository.create({ name });
  }

  async listAll() {
    return await this.environmentRepository.findAll();
  }
}
