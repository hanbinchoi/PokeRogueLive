import { PokemonTypeName } from '@/types/common';

import calcDefendType from './calcDefendType';

export default function getDefendEffectiveness(
  pokemonType: PokemonTypeName[],
  moveType: PokemonTypeName,
): number {
  const typeEffectivenessMap = calcDefendType(
    pokemonType[0],
    pokemonType.length > 1 ? pokemonType[1] : null,
    null,
  );

  if (!typeEffectivenessMap) return 1;

  for (let [effectiveness, types] of typeEffectivenessMap.entries()) {
    if (types.includes(moveType)) {
      return Number(effectiveness);
    }
  }
  return 1;
}
