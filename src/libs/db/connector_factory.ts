import {
  MySQLConnector,
  PostgresConnector,
  SQLite3Connector,
  Connector,
} from "denodb";
import { LoggerConfig } from "log/mod.ts";
export type { LoggerConfig } from "log/mod.ts";

export const supportedDialects = ["mysql", "sqlite3", "postgres"];

export type ConnectorType = typeof supportedDialects[number];

export interface ConnectorOptions {}

export interface DbConnectorOptions extends ConnectorOptions {
  database: string;
  host: string;
  username: string;
  password: string;
  port?: number;
}

export interface MySQLConnectorOptions extends DbConnectorOptions {
  charset?: string;
  logger?: LoggerConfig;
}
export interface PostgresConnectorOptions extends DbConnectorOptions {}
export interface SQLite3ConnectorOptions extends ConnectorOptions {
  filepath: string;
}

export function connectorFactory(
  ctype: ConnectorType,
  options: ConnectorOptions
): Connector {
  switch (ctype) {
    case "mysql":
      return new MySQLConnector(options as MySQLConnectorOptions);
    case "postgres":
      return new PostgresConnector(options as PostgresConnectorOptions);
    case "sqlite3":
      return new SQLite3Connector(options as SQLite3ConnectorOptions);
  }
  throw new Error(`invalid database connecor ${ctype}`);
}
