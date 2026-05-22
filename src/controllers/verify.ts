'use server';

import { decrypt } from '@apptoolkit/rsa';

import { getUserModel, restoreDBConnection } from '@/db';
import { authenticateUser } from '@/util';

export default async function verify(email: string, verificationCode: string): Promise<void> {
  await restoreDBConnection();

  const decryptedVerificationCodeBuffer = await decrypt(Buffer.from(verificationCode, 'base64'));
  const decryptedVerificationCode = decryptedVerificationCodeBuffer.toString();

  console.log({ decryptedVerificationCode });

  const user = await getUserModel().verify(email, decryptedVerificationCode);

  if (!user) {
    throw new Error('User not found');
  }

  await authenticateUser(user);
}
