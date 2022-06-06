/* eslint-disable react/no-array-index-key */
import { Aside, Display, Table } from '@/components/common';
import { IBlock } from '@/utils/block.util';

import type { FC } from 'react';

interface Props {
  nextBlock: IBlock;
}

const NextBlock: FC<Props> = ({ nextBlock }) => {
  return (
    <Aside>
      <Display style={{ justifyContent: 'center' }}>
        <Table style={{ gridTemplateColumns: `repeat(${nextBlock.shape.length}, 1fr)` }}>
          {nextBlock.shape.map((row) =>
            row.map((isColor, index) => (
              <div key={index} css={{ backgroundColor: isColor ? nextBlock.color : '#000' }} />
            )),
          )}
        </Table>
      </Display>
    </Aside>
  );
};

export default NextBlock;
