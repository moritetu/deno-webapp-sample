import { Context, Status, helpers } from "oak";
import { User } from "/db.ts";

export async function resourceUser(
  param: string,
  context: Context,
  next: () => Promise<unknown>
) {
  const params = helpers.getQuery(context, { mergeParams: true });
  if (!("userId" in params)) {
    context.throw(Status.BadRequest, "invalid url");
  }

  const { userId } = params;
  const user = await User.find(userId);
  if (!user) {
    context.throw(Status.BadRequest, "user not found");
  }

  context.state.user = user;

  return next();
}

export async function getUsers(context: Context) {
  const users = await User.all();
  context.response.body = users;
}

export async function getUser(context: Context) {
  const user = context.state.user as User;
  context.response.body = user;
}

export async function createUser(context: Context) {
  const result = context.request.body();
  if (!result) {
    context.throw(Status.BadRequest);
  }

  const { username, email } = await result.value;
  const record = await User.create({
    username,
    email,
  });
  const id = record.lastInsertId;
  const user = await User.find(String(id));

  context.response.body = user;
}

export async function deleteUser(context: Context) {
  const user = context.state.user as User;
  await user.delete();
  context.response.body = { status: "ok" };
}

export async function updateUser(context: Context) {
  const user = context.state.user as User;

  const result = await context.request.body().value;
  user.username = result?.username ?? user.username;
  user.email = result?.email ?? user.username;
  user.firstName = result?.firstName ?? user.firstName;
  user.lastName = result?.lastName ?? user.lastName;
  user.nickname = result?.nickname ?? user.nickname;

  await user.update();

  context.response.body = user;
}
