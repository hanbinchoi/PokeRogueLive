import { PokemonTypeName } from '@/types/common';

import calcDefendType from './calcDefendType';

import { EffectMultiplier } from '@/constants/contents';

export default function getDefendEffectiveness(
  pokemonType: PokemonTypeName[],
  moveType: PokemonTypeName,
): number {
  const typeEffectivenessMap = calcDefendType(
    pokemonType[0],
    pokemonType.length > 1 ? pokemonType[1] : null,
    null,
  );

  if (!typeEffectivenessMap) return EffectMultiplier.NORMAL;

  for (let [effectiveness, types] of typeEffectivenessMap.entries()) {
    if (types.includes(moveType)) {
      return Number(effectiveness);
    }
  }
  return EffectMultiplier.NORMAL;
}
