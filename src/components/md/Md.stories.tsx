import type { Meta, StoryObj } from '@storybook/react';

import Md from './Md';

const meta: Meta<typeof Md> = {
  argTypes: {
    children: {
      name: 'children',
      type: { name: 'string', required: true },
    },
  },
  component: Md,
  // tags: ['autodocs'],
  title: 'Components/Md',
};

export default meta;
type Story = StoryObj<typeof Md>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    children:
      'In JavaScript, all objects interact by *reference* when setting them equal to each other.\n\nFirst, variable `c` holds a value to an object. Later, we assign `d` with the same reference that `c` has to the object.\n\n<img src="/images/41c7c9be2f9438383dc4873ecec18784.png" width="200">\n\nWhen you change one object, you change all of them.',
  },
};
