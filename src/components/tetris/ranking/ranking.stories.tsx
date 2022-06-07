import { ComponentMeta, ComponentStory } from '@storybook/react';

import Ranking from './ranking';

export default {
  title: 'components/tetris/Ranking',
  component: Ranking,
} as ComponentMeta<typeof Ranking>;

const Template: ComponentStory<typeof Ranking> = (args) => <Ranking {...args} />;

export const Default = Template.bind({});
