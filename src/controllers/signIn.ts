'use server';

import { getUserModel, restoreDBConnection } from '@/db';
import { getVerificationLink, sendMail } from '@/util';
import { getTestMessageUrl } from 'nodemailer';

export default async function signIn(email: string): Promise<void> {
  await restoreDBConnection();

  const user = await getUserModel().requestSignIn(email);

  if (!user.verificationCode) {
    throw new Error('Verification code was not generated');
  }

  const verificationLink = await getVerificationLink(email, user.verificationCode);
  const info = await sendMail(
    email,
    'Sign in to JS Challenge',
    `Click <a href="${verificationLink}">here</a> to sign in`,
  );

  console.log(getTestMessageUrl(info));
}
