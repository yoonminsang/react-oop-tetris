import { useCallback, useEffect, useState } from 'react';

import { IBlock, makeBlockToTable, makeEmptyTable } from '@/utils/block.util';
import { copy2DArr } from '@/utils';

export const usePlayTable = (
  position: { x: number; y: number },
  isCrash: boolean,
  currentBlock: IBlock,
  onInitUser: () => void,
) => {
  const [table, setTable] = useState<string[][]>(makeEmptyTable());
  const [viewTable, setViewTable] = useState<string[][]>(table);
  const [clearLine, setClearLine] = useState<number>(0);

  const changeClearLine = useCallback((table: string[][]) => {
    const newTable = copy2DArr(table);
    let line = 0;
    newTable.forEach((row, index) => {
      const isClear = !row.includes('0');
      if (isClear) {
        line += 1;
        for (let i = index; i > 0; i--) {
          newTable[i] = newTable[i - 1];
        }
      }
    });
    setClearLine(line);
    return newTable;
  }, []);

  useEffect(() => {
    const updateTable = (table: string[][]) => {
      const newTable = makeBlockToTable(table, currentBlock, position);
      setViewTable(newTable);
      if (isCrash) {
        onInitUser();
        return changeClearLine(newTable);
      }
      return table;
    };

    setClearLine(0);
    setTable((table) => updateTable(table));
  }, [currentBlock, isCrash, onInitUser, position, changeClearLine]);

  return { viewTable, clearLine };
};
