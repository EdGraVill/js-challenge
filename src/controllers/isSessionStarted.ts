import { getSessionModel, restoreDBConnection } from '@/db';

export default async function isSessionStarted(userEmail: string): Promise<boolean> {
  await restoreDBConnection();

  const session = await getSessionModel().getSession(userEmail, true);

  return !!session;
}
