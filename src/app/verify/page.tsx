'use client';

import verify from '@/controllers/verify';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState, useTransition } from 'react';

export default async function Verify() {
  const [isLoading, startTransition] = useTransition();
  const searchParams = useSearchParams();

  const verificationCode = useMemo(() => searchParams.get('verificationCode'), []);
  const email = useMemo(() => searchParams.get('email'), []);

  useEffect(() => {
    console.log('calling');
    if (verificationCode && email) {
      startTransition(() => verify(email, decodeURIComponent(verificationCode)));
    }
  }, []);

  console.log({ isLoading });

  if (isLoading) {
    return <div>Verifying</div>;
  }

  return <div>Verified</div>;
}
