import { app } from "./app";
import { env } from "./env";
import { startMqtt } from "./mqtt-app";

app
  .listen({
    host: "0.0.0.0",
    port: env.PORT,
  })
  .then(() => {
    console.log("Server is running on port 3333");
  });

startMqtt();
