import type { Meta, StoryObj } from '@storybook/react';

import Input from './Input';

const meta: Meta<typeof Input> = {
  argTypes: {
    label: {
      type: 'string',
    },
    value: {
      type: 'string',
    },
  },
  component: Input,
  // tags: ['autodocs'],
  title: 'Components/Input',
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    label: 'Email',
    value: 'Hola',
  },
};
