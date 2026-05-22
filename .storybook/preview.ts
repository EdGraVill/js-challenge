import type { Preview } from "@storybook/react";
import './tailwind.css';
import '../public/styles/global.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'default',
      values: [
        {
          name: 'default',
          value: '#21252b',
        },
      ],
    },
  },
};

export default preview;
