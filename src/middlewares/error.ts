import { Context, isHttpError, Status, STATUS_TEXT } from "oak";
import { log } from "/libs/log.ts";

export async function errorHandler(
  context: Context,
  next: () => Promise<unknown>
) {
  try {
    await next();
  } catch (err) {
    if (isHttpError(err)) {
      log.info(err.message);
    } else {
      const error = err as Error;
      log.error(err.stack ?? err.message);
    }

    context.response.status = err.status;
    context.response.body = {
      status: err.status ?? 500,
      error: STATUS_TEXT.get(err.status) ?? "Internal Server Error",
      message: err.message,
    };
  }
}

export function uncaughtErrorHandler(event: Event) {
  log.error(event);
}

export function NotFoundErrorHandler(context: Context) {
  context.response.status = Status.NotFound;
  context.response.body = {
    status: Status.NotFound,
    error: STATUS_TEXT.get(Status.NotFound),
  };
}
