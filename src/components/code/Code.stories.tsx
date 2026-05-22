import type { Meta, StoryObj } from '@storybook/react';

import Code from './Code';

const meta: Meta<typeof Code> = {
  argTypes: {
    code: {
      name: 'code',
      type: { name: 'string', required: true },
    },
    language: {
      name: 'language',
      type: { name: 'string', required: true },
    },
  },
  component: Code,
  // tags: ['autodocs'],
  title: 'Components/Code',
};

export default meta;
type Story = StoryObj<typeof Code>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    code: "function sayHi() {\n  console.log(name);\n  console.log(age);\n  var name = 'Lydia';\n  let age = 21;\n}\n\nsayHi();",
    language: 'javascript',
  },
};
