import { FastifyInstance } from "fastify";
import { userRoutes } from "../controllers/user-controller";
import { lockRoutes } from "../controllers/lock-controller";
import { environmentsController } from "../controllers/environments-controller";
import { levelsController } from "../controllers/level-controller";
import { checkInController } from "../controllers/check-in-controller";

export async function appRoutes(app: FastifyInstance) {
  app.register(userRoutes, { prefix: "/users" });
  app.register(lockRoutes, { prefix: "/locks" });
  app.register(environmentsController, { prefix: "/environments" });
  app.register(levelsController, { prefix: "/levels" });
  app.register(checkInController, { prefix: "/check-ins" });
}
