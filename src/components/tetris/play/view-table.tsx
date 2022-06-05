/* eslint-disable react/no-array-index-key */

import { SET } from '@/constants';
import { TableS } from '@/components/common';

import type { FC } from 'react';

interface Props {
  viewTable: string[][];
}

const ViewTable: FC<Props> = ({ viewTable }) => {
  return (
    <div css={TableS} style={{ gridTemplateColumns: `repeat(${SET.col}, 1fr)` }}>
      {viewTable.map((row) =>
        row.map((color, index) => <div key={index} css={{ backgroundColor: color === '0' ? '#000' : color }} />),
      )}
    </div>
  );
};

export default ViewTable;
