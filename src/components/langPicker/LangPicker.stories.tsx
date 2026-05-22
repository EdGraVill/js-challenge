import { Language } from '@/globalTypes';
import { action } from '@storybook/addon-actions';
import { useArgs } from '@storybook/client-api';
import type { Meta, StoryObj } from '@storybook/react';
import { useCallback } from 'react';

import LangPicker from './LangPicker';

const meta: Meta<typeof LangPicker> = {
  argTypes: {
    lang: {
      control: {
        options: Object.keys(Language),
        type: 'select',
      },
    },
  },
  component: LangPicker,
  // tags: ['autodocs'],
  title: 'Components/LangPicker',
};

export default meta;
type Story = StoryObj<typeof LangPicker>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    lang: 'en-EN',
  },
  render(args) {
    const [_, updateArgs] = useArgs();

    const onLangChange = useCallback((lang: keyof typeof Language) => {
      _;
      updateArgs({ lang });
      action('onLangChange')(lang);
    }, []);

    return <LangPicker {...args} onLangChange={onLangChange} />;
  },
};
