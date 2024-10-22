import { client } from "../mqtt-client";
import { LockService } from "../services/lock-service";

interface Message {
  id: string;
  key: string;
}

export class MqttController {
  constructor(private lockService: LockService) {}

  public async auth({ id, key }: Message) {
    const lock = await this.lockService.auth(id, key);

    if (lock) {
      console.log("auth", id, key);
      client.publish("open-" + id, "true");
    }
  }
}
