// import EmailVerification from "@/components/email/email-verification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationMail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const confirmationLink = decodeURIComponent(
    `${process.env.APP_URL}/auth/new-verification?token=${token}`
  );
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to confirm your email.</p>`,
  });
};

export const sendResetMail = async ({
  email,
  token,
}: {
  email: string;
  token: string;
}) => {
  const confirmationLink = decodeURIComponent(
    `${process.env.APP_URL}/auth/new-password?token=${token}`
  );
  await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `<p>Click <a href="${confirmationLink}">here</a> to reset your password.</p>`,
  });
};
