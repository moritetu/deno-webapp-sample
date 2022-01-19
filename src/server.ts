import { Application } from "oak";
import { env } from "/libs/env.ts";
import { log } from "/libs/log.ts";
import { router } from "/routes.ts";
import { dbSync } from "/db.ts";

const app = new Application();
const port: number = env.has("PORT") ? parseInt(env.require("PORT"), 10) : 8000;
const host = env.get("HOST") || "localhost";

router(app);

dbSync();

log.info(`Server started on http://${host}:${port}`);

await app.listen({ port });
