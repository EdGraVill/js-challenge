'use server';

import { signJWT } from '@apptoolkit/jwt';

import type { UserDocument } from '@/db';
import { cookies } from 'next/headers';

export default async function authenticateUser(user: UserDocument) {
  'use server';

  const jwt = await signJWT({ auth: true, email: user.email, is2FAEnabled: false });

  cookies().set('jwt', jwt);
}
