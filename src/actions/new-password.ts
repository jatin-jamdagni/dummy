"use server";

import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { NewPasswordProps, NewPasswordSchema } from "@/schemas";
import prisma from "@/lib/db";

export const newPassword = async (
  values: NewPasswordProps,
  token?: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }

  const validateField = NewPasswordSchema.safeParse(values);

  if (!validateField.success) {
    return { error: "Invalid field!" };
  }

  const { password } = validateField.data;

  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Token not found!" };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);

  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "Email not found!" };
  }

  const hashPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashPassword,
    },
  });

  await prisma.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
