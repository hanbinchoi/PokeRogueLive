import { TypeBadge } from '../common';

import { PokemonDetailProps } from '@/types/common';

export interface PokemonBasicInfoProps {
  pokemon: PokemonDetailProps;
}

/**
 *  포켓몬 기본정보 컴포넌트
 *
 * 이름, 타입, 도감설명을 표시합니다.
 *
 * @param pokemon  포켓몬 상세 정보 (`PokemonDetailProps`)
 */
export const PokemonBasicInfo = ({ pokemon }: PokemonBasicInfoProps) => {
  return (
    <div className="flex flex-col gap-3 text-sm min-[480px]:text-base ">
      <div className="flex justify-between">
        <div>
          <h1 className="font-bold text-lg min-[480px]:text-2xl">{`${pokemon.name}`}</h1>{' '}
        </div>
      </div>
      <div className="flex gap-2 sm:gap-3">
        {pokemon.type.map((t, i) => (
          <TypeBadge key={t + i} size="small" type={t} />
        ))}
      </div>
      <div className="text-md sm:text-lg">{pokemon.flavor_text}</div>
    </div>
  );
};
