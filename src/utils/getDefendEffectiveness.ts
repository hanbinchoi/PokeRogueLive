import { PokemonTypeName } from '@/types/common';

import { EffectMultiplier } from '@/constants/contents';
import getDamageMapByTypes from './getDamageMapByTypes';

export default function getDefendEffectiveness(
  pokemonType: PokemonTypeName[],
  moveType: PokemonTypeName,
): number {
  const typeEffectivenessMap = getDamageMapByTypes(pokemonType, null);

  if (!typeEffectivenessMap) return EffectMultiplier.NORMAL;

  for (let [effectiveness, types] of typeEffectivenessMap.entries()) {
    if (types.includes(moveType)) {
      return Number(effectiveness);
    }
  }
  return EffectMultiplier.NORMAL;
}
