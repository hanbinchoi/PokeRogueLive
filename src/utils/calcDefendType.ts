import { calcResultType, PokemonTypeName } from '@/types/common';

import {
  POKEMON_TYPE_INFO,
  POKEMON_TYPE_ARRAY,
  EffectMultiplier,
} from '@/constants/contents';

import calcSingleDefendType from './calcSingleDefendType';
import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcDefendAbility from './calcDefendAbility';

export default function calcDefendType(
  first: PokemonTypeName | null,
  second: PokemonTypeName | null,
  ability?: string | null,
): calcResultType {
  const damageMap = new Map<number, PokemonTypeName[]>();

  if (first === null) {
    if (second)
      return calcSingleDefendType(POKEMON_TYPE_INFO[second], second, ability);

    return null;
  }
  if (second === null) {
    if (first)
      return calcSingleDefendType(POKEMON_TYPE_INFO[first], first, ability);

    return null;
  }

  if (first === second) {
    return calcSingleDefendType(POKEMON_TYPE_INFO[first], first, ability);
  }

  const firstType = POKEMON_TYPE_INFO[first];
  const secondType = POKEMON_TYPE_INFO[second];

  POKEMON_TYPE_ARRAY.forEach((type) => {
    let score = 1;
    if (type === 'unknown') return;

    if (
      firstType.noDamage.find((t) => t === type) ||
      secondType.noDamage.find((t) => t === type)
    ) {
      score = EffectMultiplier.NONE;
    }
    if (firstType.halfDamage.find((t) => t === type)) {
      score *= EffectMultiplier.HALF;
    }
    if (firstType.doubleDamage.find((t) => t === type)) {
      score *= EffectMultiplier.DOUBLE;
    }
    if (secondType.halfDamage.find((t) => t === type)) {
      score *= EffectMultiplier.HALF;
    }
    if (secondType.doubleDamage.find((t) => t === type)) {
      score *= EffectMultiplier.DOUBLE;
    }
    if (ability) {
      score = calcDefendAbility(ability, score, type, [first, second]);
    }
    addToMap(damageMap, score, type);
  });

  return sortedMap(damageMap);
}
