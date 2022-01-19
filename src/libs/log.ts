import * as log from "log/mod.ts";
import { env, isDevelopment } from "/libs/env.ts";
import { datetime as dt } from "ptera";

const logLevel = (env.get("LOG_LEVEL") ||
  (isDevelopment ? "DEBUG" : "INFO")) as log.LevelName;

function defaultFormatter(logRecord: log.LogRecord) {
  const { datetime, levelName, msg } = logRecord;
  const logTime = dt(datetime).toISO();
  return `${logTime} ${levelName.padEnd(7)} ${msg}`;
}

export function logger(name?: string): log.Logger {
  const logger = log.getLogger(name);
  return logger;
}

await log.setup({
  handlers: {
    default: new log.handlers.ConsoleHandler(logLevel, {
      formatter: defaultFormatter,
    }),
  },

  loggers: {
    default: { level: logLevel, handlers: ["default"] },
  },
});

export { log };
