import { PokemonType } from '@/types/common';

import { EffectMultiplier } from '@/constants/contents';

import getDefendDamageMap from './getDefendDamageMap';

export default function getDefendEffectiveness(
  pokemonType: PokemonType[],
  moveType: PokemonType,
): number {
  const typeEffectivenessMap = getDefendDamageMap(pokemonType, null);

  if (!typeEffectivenessMap) return EffectMultiplier.NORMAL;

  for (let [effectiveness, types] of typeEffectivenessMap.entries()) {
    if (types.includes(moveType)) {
      return Number(effectiveness);
    }
  }
  return EffectMultiplier.NORMAL;
}
