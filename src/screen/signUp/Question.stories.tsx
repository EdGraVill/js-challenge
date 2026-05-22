import { action } from '@storybook/addon-actions';
import type { Meta, StoryObj } from '@storybook/react';

import SignUp from './SignUp';

const meta: Meta<typeof SignUp> = {
  component: SignUp,
  // tags: ['autodocs'],
  title: 'Screens/SignUp',
};

export default meta;
type Story = StoryObj<typeof SignUp>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    onCancel: action('onCancel'),
    onSignUp: action('onSignUp'),
  },
};
