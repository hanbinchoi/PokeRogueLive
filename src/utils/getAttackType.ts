import { calcResultType, PokemonTypeName } from '@/types/common';

import addToMap from './addToMap';
import sortedMap from './sortedMap';
import getAttackEffectMap from './getAttackEffectMap';
import calcEffectMultiplier from './calcAttackMultiplier';

import { POKEMON_TYPE_ARRAY, EXCLUDED_TYPES } from '@/constants/contents';

export default function getAttackType(
  checkedType: PokemonTypeName[],
  attackAbility: string | null,
  attackMove: string | null,
): calcResultType | null {
  const effectMap = new Map<number, PokemonTypeName[]>();
  const attackEffectMap = getAttackEffectMap(checkedType);

  POKEMON_TYPE_ARRAY.forEach((type) => {
    if (EXCLUDED_TYPES.has(type)) return;

    const multiplier = calcEffectMultiplier(
      type,
      attackEffectMap,
      attackAbility,
      attackMove,
    );

    addToMap(effectMap, multiplier, type);
  });

  return sortedMap(effectMap);
}
