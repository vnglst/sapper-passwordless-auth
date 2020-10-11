import type { User } from "@prisma/client";
import { v4 } from "uuid";
import { FORGET_PASSWORD_PREFIX } from "../../constants";
import { prisma, redis, sendEmail } from "../../services";
import * as emails from "./user.emails";

export async function login(email: string) {
  const user = await prisma.user.findOne({ where: { email } });
  const token = v4();

  if (!user) return await sendEmail(emails.noAccountFound(email));

  await redis.set(
    FORGET_PASSWORD_PREFIX + token,
    user.id,
    "ex",
    1000 * 60 * 60 * 24 * 1 // 1 day
  );

  await sendEmail(emails.magicLoginLink(user.email, token));
}

export async function register(email: string, name: string) {
  const token = v4();

  let user: User;

  const existingUser = await prisma.user.findOne({ where: { email } });

  if (existingUser) {
    await sendEmail(emails.alreadyUser(existingUser.email, token));
    user = existingUser;
  } else {
    user = await prisma.user.create({ data: { email, name } });
    await sendEmail(emails.newUser(user.email, token));
  }

  await redis.set(
    FORGET_PASSWORD_PREFIX + token,
    user.id,
    "ex",
    1000 * 60 * 60 * 24 * 1 // 1 day
  );
}

export async function verifyToken(token: string) {
  const userId = await redis.get(FORGET_PASSWORD_PREFIX + token);

  if (userId) {
    const user = await prisma.user.findOne({
      where: { id: parseInt(userId, 10) },
    });
    return { user };
  }

  return {};
}
