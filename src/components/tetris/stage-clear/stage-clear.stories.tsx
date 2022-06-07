import { ComponentMeta, ComponentStory } from '@storybook/react';

import StageClear from './stage-clear';

export default {
  title: 'components/tetris/StageClear',
  component: StageClear,
} as ComponentMeta<typeof StageClear>;

const Template: ComponentStory<typeof StageClear> = (args) => <StageClear {...args} />;

export const Default = Template.bind({});
