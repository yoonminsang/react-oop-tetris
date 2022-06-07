import { ComponentMeta, ComponentStory } from '@storybook/react';

import Clear from './clear';

export default {
  title: 'components/tetris/Clear',
  component: Clear,
} as ComponentMeta<typeof Clear>;

const Template: ComponentStory<typeof Clear> = (args) => <Clear {...args} />;

export const Default = Template.bind({});
