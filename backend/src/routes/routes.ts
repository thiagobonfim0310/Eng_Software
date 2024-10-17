import { FastifyInstance } from "fastify";
import { userRoutes } from "../controllers/user-controller";
import { lockRoutes } from "../controllers/lock-controller";
import { environmentsController } from "../controllers/environments-controller";

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/users" });
  app.register(lockRoutes, { prefix: "/locks" });
  app.register(environmentsController, { prefix: "/environments" });
}
