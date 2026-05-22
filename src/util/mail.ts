import type { SentMessageInfo } from 'nodemailer';
import { createTestAccount, createTransport } from 'nodemailer';

export async function sendMail(to: string, subject: string, html: string): Promise<SentMessageInfo> {
  const testAccount = await createTestAccount();

  const transporter = createTransport({
    auth: {
      pass: testAccount.pass,
      user: testAccount.user,
    },
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
  });

  return transporter.sendMail({
    from: '"JS Challenge 👻" <mailer@jschallenge.app>',
    html,
    subject,
    to,
  });
}
