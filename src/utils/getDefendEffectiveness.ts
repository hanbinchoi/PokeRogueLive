import { PokemonTypeName } from '@/types/common';

import { EffectMultiplier } from '@/constants/contents';
import getDefendDamageMapByTypes from './getDefendDamageMapByTypes';

export default function getDefendEffectiveness(
  pokemonType: PokemonTypeName[],
  moveType: PokemonTypeName,
): number {
  const typeEffectivenessMap = getDefendDamageMapByTypes(pokemonType, null);

  if (!typeEffectivenessMap) return EffectMultiplier.NORMAL;

  for (let [effectiveness, types] of typeEffectivenessMap.entries()) {
    if (types.includes(moveType)) {
      return Number(effectiveness);
    }
  }
  return EffectMultiplier.NORMAL;
}
