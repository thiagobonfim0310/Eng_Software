import { Environment as PrismaEnvironment } from "@prisma/client";

interface Environment extends PrismaEnvironment {
  environmentId?: string;
  subEnvironments?: Environment[];
}
import { LockRepository } from "../repositories/lock-repository";
import { UserRepository } from "../repositories/user-repository";
import { EnvironmentRepository } from "../repositories/environments-repository";
import { CheckInRepository } from "../repositories/check-in-repository";

interface Lock {
  name: string;
}
const findEnvironmentRecursively = (
  environments: Environment[],
  environmentId: string
): boolean => {
  console.log(environments, environmentId);
  for (const env of environments) {
    console.log(env);
    if (env.id === environmentId) {
      return true;
    }
    if (
      env.subEnvironments &&
      findEnvironmentRecursively(env.subEnvironments, environmentId)
    ) {
      return true;
    }
  }
  return false;
};
export class LockService {
  constructor(
    private lockRepository: LockRepository,
    private userRespository: UserRepository,
    private environmentRespository: EnvironmentRepository,
    private checkInRepository: CheckInRepository
  ) {}
  async register({ name }: Lock) {
    await this.lockRepository.create({ name });
  }

  async listAll() {
    return await this.lockRepository.findAll();
  }

  async updateLockEnvironment(id: string, environmentId: string) {
    const environment =
      await this.environmentRespository.findById(environmentId);
    console.log(environment);
    if (!environment) {
      return false;
    }

    const lock = await this.lockRepository.updateLockEnvironment(
      id,
      environmentId
    );

    return lock;
  }

  async deleteById(id: string) {
    return await this.lockRepository.deleteById(id);
  }

  async auth(idName: string, userTag: string) {
    const user = await this.userRespository.findByTag(userTag);

    const lock = await this.lockRepository.findByName(idName);

    console.log(user, lock);

    if (!user || !lock || lock.environmentId == null) {
      if (lock && lock.environmentId != null) {
        await this.checkInRepository.create({
          environment_id: lock?.environmentId,
          validated: false,
        });
      }
      return false;
    }

    const environments = user.environments.map(
      (envUser) => envUser.environment
    );

    const environmentIsPresent = findEnvironmentRecursively(
      environments,
      lock.environmentId
    );
    console.log(environmentIsPresent);
    if (!environmentIsPresent) {
      await this.checkInRepository.create({
        environment_id: lock.environmentId,
        user_id: user.id,
        validated: false,
      });

      return false;
    }

    await this.checkInRepository.create({
      environment_id: lock.environmentId,
      user_id: user.id,
      validated: true,
    });
    return true;
  }

  async deleteEnvironmentFromLock(lockId: string, environmentId: string) {
    const lock = await this.lockRepository.findById(lockId); // Certifique-se de ter um método findById no repository
    if (!lock || lock.environmentId !== environmentId) {
        return false; // Lock ou ambiente não correspondem
    }

    return await this.lockRepository.deleteEnvironmentFromLock(lockId, environmentId);
  }
}
