// user-services.ts
import { UserRepository } from "../repositories/user-repository";

interface User {
  name: string;
  tag: string;
  cpf: string;
}

interface EnvironmentUser {
  environmentId: string;
  environment: {
    id: string;
    name: string;
  };
}

export interface UserWithEnvironments {
  id: string;
  name: string;
  cpf: string;
  tag: string;
  createdAt: Date; // Ajuste o tipo conforme necessário
  environments: EnvironmentUser[];
}

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async register({ name, tag, cpf }: User) {
    await this.userRepository.create({ name, tag, cpf });
  }

  async listAll(): Promise<UserWithEnvironments[]> {
    return await this.userRepository.findAll();
  }

  async updateUserEnvironment(cpf: string, environmentId: string) {
    return await this.userRepository.updateUserEnvironment(cpf, environmentId);
  }

  async deleteByCpf(cpf: string) {
    return await this.userRepository.deleteByCpf(cpf);
  }
}
