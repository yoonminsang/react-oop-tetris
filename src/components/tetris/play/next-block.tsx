/* eslint-disable react/no-array-index-key */
import { AsideS, DisplayS, TableS } from '@/components/common';
import { IBlock } from '@/utils/block.util';

import type { FC } from 'react';

interface Props {
  nextBlock: IBlock;
}

const NextBlock: FC<Props> = ({ nextBlock }) => {
  return (
    <aside css={AsideS}>
      <div css={DisplayS} style={{ justifyContent: 'center' }}>
        <div css={TableS} style={{ gridTemplateColumns: `repeat(${nextBlock.shape.length}, 1fr)` }}>
          {nextBlock.shape.map((row) =>
            row.map((isColor, index) => (
              <div key={index} css={{ backgroundColor: isColor ? nextBlock.color : '#000' }} />
            )),
          )}
        </div>
      </div>
    </aside>
  );
};

export default NextBlock;
