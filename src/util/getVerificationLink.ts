import { encrypt } from '@apptoolkit/rsa';

export default async function getConfirmationLink(email: string, verificationCode: string): Promise<string> {
  try {
    const encryptedVerificationCodeBuffer = await encrypt(Buffer.from(verificationCode));
    const encryptedVerificationCode = encryptedVerificationCodeBuffer.toString('base64');

    const activationLink = new URL('verify', process.env.APP_URL ?? 'http://localhost:3000');
    activationLink.searchParams.append('email', email);
    activationLink.searchParams.append('verificationCode', encodeURIComponent(encryptedVerificationCode));

    return activationLink.toString();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
