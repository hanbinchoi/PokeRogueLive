import { PokemonStatInput } from './PokemonStatInput';

import { PokemonDetailProps } from '@/types/common';
import { StatDataProps } from '@/types/data';

export interface PokemonStatsEditorProps {
  stats: StatDataProps[];
  pokemon: PokemonDetailProps;
  setPokemon: (pokemon: PokemonDetailProps | null) => void;
}

/**
 * 포켓몬 스탯 박스 컴포넌트.
 *
 * 포켓몬의 스탯을 표시하며, 각각의 스탯에 대해 값을 조정할 수 있는 `PokemonStatInput`을 렌더링합니다.
 *
 * @param stats - 포켓몬의 스탯 데이터 리스트 (`StatDataProps[]`)
 * @param pokemon - 포켓몬의 상세 정보 (`PokemonDetailProps`)
 * @param setPokemon - 포켓몬 상세 정보 업데이트 함수
 */
export const PokemonStatsEditor = ({
  stats,
  pokemon,
  setPokemon,
}: PokemonStatsEditorProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      {stats.map((stat) => (
        <PokemonStatInput
          key={stat.stat.name}
          stat={stat}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      ))}
    </div>
  );
};
