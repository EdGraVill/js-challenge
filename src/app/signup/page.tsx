'use client';

import signUp from '@/controllers/signUp';
import { Language } from '@/globalTypes';
import type { ChangeEvent } from 'react';
import { useState, useTransition } from 'react';

export default function Signup() {
  const [isLoading, startTransition] = useTransition();
  const [email, setEmail] = useState('edgravill@gmail.com');
  const [name, setName] = useState('Eduardo Grajales');
  const [preferredLanguage, setPreferredLanguage] = useState<keyof typeof Language>('en-EN');

  const onSignup = () => {
    startTransition(() => signUp(email, name, preferredLanguage));
  };

  console.log({ isLoading });

  return (
    <div className="text-gray-400">
      <h1>Signup</h1>
      <label>
        Email
        <input
          onChange={({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setEmail(value)}
          type="email"
          value={email}
        />
      </label>
      <label>
        Name
        <input
          onChange={({ currentTarget: { value } }: ChangeEvent<HTMLInputElement>) => setName(value)}
          type="text"
          value={name}
        />
      </label>
      <label>
        Preferred Language
        <select
          onChange={({ currentTarget: { value } }: ChangeEvent<HTMLSelectElement>) =>
            setPreferredLanguage(value as keyof typeof Language)
          }
          value={preferredLanguage}
        >
          {Object.entries(Language).map(([key, value]) => (
            <option key={key} value={key}>
              {value}
            </option>
          ))}
        </select>
      </label>
      <button disabled={isLoading} onClick={onSignup} type="button">
        Signup
      </button>
    </div>
  );
}
