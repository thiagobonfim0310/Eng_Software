import { client } from "./mqtt-client";
import { routesMqtt } from "./routes/mqtt-routes";

export const startMqtt = () => {
  client.on("connect", () => {
    console.log("Connected to MQTT broker");

    client.subscribe("auth", (err) => {
      if (err) {
        console.error('Erro ao se inscrever no tópico "auth":', err);
      } else {
        console.log('Inscrito no tópico "auth"');
      }
    });
  });

  routesMqtt();
};
