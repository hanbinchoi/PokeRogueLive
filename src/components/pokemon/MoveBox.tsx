import { useEffect, useState } from 'react';

import { PagingDocuments } from '../common/PagingDocuments';
import { Move } from './Move';

import { MoveDataProps } from '@/types/data';

import { MOVE_PAGE_ITEM_SIZE } from '@/constants/contents';

export interface EggMoveBoxProps {
  moves: MoveDataProps[];
}

/**
 * 포켓몬이 배울 수 있는 기술 목록을 표시하는 컴포넌트.
 *
 * - 기술 목록을 페이지네이션을 통해 나눠서 보여줍니다.
 *
 * @param moves 포켓몬이 배울 수 있는 기술 목록 (`MoveDataProps[]`)
 */
export const MoveBox = ({ moves }: EggMoveBoxProps) => {
  console.log(moves);
  const [now, setNow] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    setTotal(moves.length);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold">배우는 기술</p>
      <div className="flex flex-col gap-6">
        {moves
          .slice((now - 1) * MOVE_PAGE_ITEM_SIZE, now * MOVE_PAGE_ITEM_SIZE)
          .map((m, i) => (
            <Move
              levelLearnedAt={
                m.version_group_details[m.version_group_details.length - 1] // 마지막 버전을 기준으로 함
                  .level_learned_at
              }
              url={m.move.url}
              key={i}
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
