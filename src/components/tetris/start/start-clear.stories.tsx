import { ComponentMeta, ComponentStory } from '@storybook/react';

import Start from './start';

export default {
  title: 'components/tetris/Start',
  component: Start,
} as ComponentMeta<typeof Start>;

const Template: ComponentStory<typeof Start> = (args) => <Start {...args} />;

export const Default = Template.bind({});
