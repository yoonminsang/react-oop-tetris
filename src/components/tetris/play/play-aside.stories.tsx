import { ComponentMeta, ComponentStory } from '@storybook/react';

import PlayAside from './play-aside';

export default {
  title: 'components/tetris/PlayAside',
  component: PlayAside,
} as ComponentMeta<typeof PlayAside>;

const Template: ComponentStory<typeof PlayAside> = (args) => <PlayAside {...args} />;

export const Default = Template.bind({});
Default.args = {
  score: 10,
  needClearLine: 20,
  stage: 1,
};
