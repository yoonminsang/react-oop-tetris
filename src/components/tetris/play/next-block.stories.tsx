import { ComponentMeta, ComponentStory } from '@storybook/react';
import { css } from '@emotion/react';

import { BLOCK } from '@/utils/block.util';

import NextBlock from './next-block';

export default {
  title: 'components/tetris/NextBlock',
  component: NextBlock,
  decorators: [
    (Str) => (
      <div
        css={css`
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 20px;
          overflow: scroll;
        `}
      >
        <Str />
      </div>
    ),
  ],
} as ComponentMeta<typeof NextBlock>;

const Template: ComponentStory<typeof NextBlock> = (args) => <NextBlock {...args} />;

export const Default = () => (
  <>
    {BLOCK.map((v, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <Template key={index} nextBlock={v} />
    ))}
  </>
);
