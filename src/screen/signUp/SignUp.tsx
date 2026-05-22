import Form from '@apptoolkit/form';
import type { InputDefinition } from '@apptoolkit/form';

import { Input, LangPicker } from '@/components';
import type signUp from '@/controllers/signUp';
import type { Language } from '@/globalTypes';
import type { ChangeEvent } from 'react';

const inputDefinitions: InputDefinition[] = [
  {
    name: 'email',
    validators: [
      Form.commonValidators.isRequiredBuilder('Email required'),
      Form.commonValidators.isEmailBuilder('Please enter a valid email'),
    ],
  },
  {
    name: 'name',
    validators: [Form.commonValidators.isRequiredBuilder('Name required')],
  },
  {
    initialValue: 'en-EN',
    name: 'preferredLanguage',
    validators: [Form.commonValidators.isRequiredBuilder('Preferred language required')],
  },
];

interface Props {
  onCancel(): void;
  onSignUp(...args: Parameters<typeof signUp>): void;
}

const SignUp: React.FC<Props> = ({ onCancel, onSignUp }) => {
  return (
    <main>
      <h1>Sign Up</h1>
      <p>By creating an account you will be able to take the challenge any where in any device</p>
      <p>JS Challenge only store your name, email and results</p>
      <Form inputDefinitions={inputDefinitions}>
        <Form.HTMLInputWrapper name="email">
          {({ feedback, isDirty, ...inputProps }) => (
            <>
              <Input {...inputProps} label="Email" />
              {isDirty && feedback && <p>{feedback[0].message}</p>}
            </>
          )}
        </Form.HTMLInputWrapper>
        <Form.HTMLInputWrapper name="name">
          {({ feedback, isDirty, ...inputProps }) => (
            <>
              <Input {...inputProps} label="Full Name" />
              {isDirty && feedback && <p>{feedback[0].message}</p>}
            </>
          )}
        </Form.HTMLInputWrapper>
        <Form.HTMLInputWrapper name="preferredLanguage">
          {({ value, onChange }) => (
            <LangPicker
              lang={value as keyof typeof Language}
              onLangChange={(lang) => onChange({ currentTarget: { value: lang } } as ChangeEvent<HTMLSelectElement>)}
            />
          )}
        </Form.HTMLInputWrapper>
      </Form>
    </main>
  );
};

export default SignUp;
