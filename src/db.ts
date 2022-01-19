import { Database } from "denodb";
import { env, isDevelopment } from "/libs/env.ts";
import { log } from "/libs/log.ts";
import { connectorFactory, ConnectorType } from "/libs/db/connector_factory.ts";
import { User } from "/models/user.ts";

export async function dbSync() {
  log.info(`initializing tables`);

  db.link([User]);

  try {
    await db.sync({ drop: true });
  } catch (e) {
    log.error(e);
  }
}

const connectorType = env.require("DB_CONNECTOR");
const connectorOptions = {
  database: env.get("DB_NAME"),
  host: env.get("DB_HOST"),
  username: env.get("DB_USER"),
  password: env.get("DB_PASSWORD"),
  port: env.has("DB_PORT") ? Number(env.get("DB_PORT")) : undefined,
  filepath: env.has("DB_NAME") ? env.get("DB_NAME") : undefined,
};

const connector = connectorFactory(
  connectorType as ConnectorType,
  connectorOptions
);

log.info(`use dialect ${connectorType}`);
const db = new Database({ connector, debug: isDevelopment });

export { db, User };
