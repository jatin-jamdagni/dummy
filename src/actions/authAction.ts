"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import prisma from "@/lib/db";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import {
  LoginProps,
  LoginSchema,
  RegisterProps,
  RegisterSchema,
} from "@/schemas";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
 
export async function handleCredentialsSignIn(values: LoginProps) {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { email, password } = validateFields.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }

    throw error;
  }

  
  // return {
  //   success: "Email Sent!",
  // };
}

export async function handleRegister(values: RegisterProps) {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }
  const { email, name, password, role } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role,
    },
  });

  //TODO: Send verification email

  return {
    success: "User Created!",
  };
}

// export async function handleForgetPassword(values: ForgetProps) {
//   //   const { email, password } = props;
//   console.log("these are values ", values)

//   const validateFields = ForgetSchema.safeParse(values);
//   if (!validateFields.success) {
//     return { error: "Invalid fields!" }
//   }
//   return {
//     success: "Email Sent!"
//   }
// }
