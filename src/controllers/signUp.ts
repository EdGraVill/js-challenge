'use server';

import { getUserModel, restoreDBConnection } from '@/db';
import type { Language } from '@/globalTypes';
import { getVerificationLink, sendMail } from '@/util';
import { getTestMessageUrl } from 'nodemailer';

export default async function signUp(
  email: string,
  name: string,
  preferredLanguage: keyof typeof Language,
): Promise<void> {
  await restoreDBConnection();

  const newUser = await getUserModel().signUp(email, name, preferredLanguage);

  if (!newUser.verificationCode) {
    throw new Error('Verification code was not generated');
  }

  const verificationLink = await getVerificationLink(email, newUser.verificationCode);
  const info = await sendMail(
    email,
    'Sign in to JS Challenge',
    `Click <a href="${verificationLink}">here</a> to sign in`,
  );

  console.log(getTestMessageUrl(info));
}
