import { useEffect, useState } from 'react';

import { Move } from '../Move/Move';
import { PagingDocuments } from '../PagingDocuments/PagingDocuments';

import { MoveDataProps } from '@/types/data';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

import { MOVE_PAGE_ITEM_SIZE } from '@/constants/contents';

export interface EggMoveBoxProps {
  moves: MoveDataProps[];
}

export const MoveBox = ({ moves }: EggMoveBoxProps) => {
  const [now, setNow] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(moves.length);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">배우는 기술</p>
      <div className="flex flex-col gap-6">
        {moves.slice((now - 1) * 4, (now - 1) * 4 + 4).map((m, i) => (
          <Move
            levelLearnedAt={
              m.version_group_details[m.version_group_details.length - 1]
                .level_learned_at
            }
            url={m.move.url}
            key={extractIdFromUrl(m.move.url)}
          />
        ))}
      </div>
      <PagingDocuments
        now={now}
        total={total}
        setNow={setNow}
        pageSize={MOVE_PAGE_ITEM_SIZE}
      />
    </div>
  );
};
