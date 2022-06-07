import { ComponentMeta, ComponentStory } from '@storybook/react';

import StageIntro from './stage-intro';

export default {
  title: 'components/tetris/StageIntro',
  component: StageIntro,
} as ComponentMeta<typeof StageIntro>;

const Template: ComponentStory<typeof StageIntro> = (args) => <StageIntro {...args} />;

export const Default = Template.bind({});
Default.args = {
  increaseStage: () => {},
  setStep: () => {},
  stage: 1,
};
