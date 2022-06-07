import { ComponentMeta, ComponentStory } from '@storybook/react';

import Dead from './dead';

export default {
  title: 'components/tetris/Dead',
  component: Dead,
} as ComponentMeta<typeof Dead>;

const Template: ComponentStory<typeof Dead> = (args) => <Dead {...args} />;

export const Default = Template.bind({});
