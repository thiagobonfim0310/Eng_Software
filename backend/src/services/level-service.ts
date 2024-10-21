import { LevelRepository } from "../repositories/level-repository";

interface Level {
  name: string;
}

export class LevelService {
  constructor(private levelRepository: LevelRepository) {}

  async register({ name }: Level) {
    await this.levelRepository.create({ name });
  }

  async listAll() {
    return await this.levelRepository.findAll();
  }

  async assignEnvironment(levelId: string, environmentId: string) {
    return await this.levelRepository.assignEnvironment(levelId, environmentId);
  }

  async removeEnvironment(levelId: string, environmentId: string) {
    return await this.levelRepository.removeEnvironment(levelId, environmentId);
  }

  async deleteById(id: string) {
    return await this.levelRepository.deleteById(id);
  }
}
