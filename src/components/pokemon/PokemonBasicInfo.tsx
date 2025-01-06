import { TypeBadge } from '../TypeBadge/TypeBadge';

import { PokemonDetailProps } from '@/types/common';

export interface PokemonBasicInfoProps {
  pokemon: PokemonDetailProps;
}

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
