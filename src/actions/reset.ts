"use server";
import { getUserByEmail } from "@/data/user";
import { sendResetMail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";
import { ResetProps, ResetSchema } from "@/schemas";

export const reset = async (values: ResetProps) => {
  const validateFields = ResetSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid email!" };
  }

  const { email } = validateFields.data;

  // Await the `getUserByEmail` function call if it's async
  const user = await getUserByEmail(email);
  console.log("existingUser", !user);

  // Check if user does not exist and return an error
  if (!user) {
    return { error: "User not found!" };
  }

  // Generate password reset token
  const passwordResetToken = await generatePasswordResetToken(email);

  // Send reset email
  await sendResetMail({
    email: passwordResetToken.email,
    token: passwordResetToken.token,
  });

  return { success: "Reset email sent!" };
};
