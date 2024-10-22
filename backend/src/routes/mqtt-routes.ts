import { client } from "../mqtt-client";
import { MqttController } from "../controllers/mqtt-controller";
import { LockService } from "../services/lock-service";
import { LockRepository } from "../repositories/lock-repository";
import { UserRepository } from "../repositories/user-repository";
import { EnvironmentRepository } from "../repositories/environments-repository";
import { CheckInRepository } from "../repositories/check-in-repository";

export const routesMqtt = () => {
  const lockRepository = new LockRepository();
  const userRespository = new UserRepository();
  const environmentRespository = new EnvironmentRepository();
  const checkInRepository = new CheckInRepository();
  const lockService = new LockService(
    lockRepository,
    userRespository,
    environmentRespository,
    checkInRepository
  );
  const mqttController = new MqttController(lockService);
  client.on("message", (topic, message) => {
    switch (topic) {
      case "auth":
        mqttController.auth(JSON.parse(message.toString()));
        break;
    }
  });
};
