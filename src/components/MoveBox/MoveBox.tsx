import { useEffect } from 'react';

import usePokemonDetailStore from '@/stores/pokemonDetailStore';

import { Move } from '../Move/Move';
import { MovePagingDocuments } from '../MovePagingDocuments/MovePagingDocuments';

import { MoveInfoProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

export interface EggMoveBoxProps {
  moves: MoveInfoProps[];
}

export const MoveBox = ({ moves }: EggMoveBoxProps) => {
  const { setTotal, now } = usePokemonDetailStore();

  useEffect(() => {
    setTotal(moves.length);
  }, []);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-bold w-full">배우는 기술</p>
      <div className="flex flex-col gap-4">
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
      <MovePagingDocuments />
    </div>
  );
};
