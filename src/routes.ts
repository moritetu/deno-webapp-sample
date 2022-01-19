import { Application, Router } from "oak";
import * as user from "/controllers/user.ts";
import {
  errorHandler,
  uncaughtErrorHandler,
  NotFoundErrorHandler,
} from "/middlewares/error.ts";

export function router(app: Application) {
  const router = new Router();

  router.param("userId", user.resourceUser);

  const users = new Router();
  users.post("/", user.createUser);
  users.get("/", user.getUsers);
  users.get("/:userId", user.getUser);
  users.put("/:userId", user.updateUser);
  users.delete("/:userId", user.deleteUser);

  router.use("/api/v1/users", users.routes(), users.allowedMethods());

  app.use(errorHandler);
  app.addEventListener("error", uncaughtErrorHandler);

  app.use(router.routes());

  app.use(NotFoundErrorHandler);
}
