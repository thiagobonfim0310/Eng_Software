import { UserRepository } from "../repositories/user-repository";

interface User {
  name: string;
  tag: string;
  cpf: string;
}

export class UserService {
  constructor(private userRepository: UserRepository) {}
  async register({ name, tag, cpf }: User) {
    await this.userRepository.create({ name, tag, cpf });
  }

  async listAll() {
    return await this.userRepository.findAll();
  }

  // async findById(id: number) {
  //   return await this.userRepository.findById(id);
  // }

  // async update({ id, name, tag, cpf }: User) {

  //async delete(id: number) {
}
