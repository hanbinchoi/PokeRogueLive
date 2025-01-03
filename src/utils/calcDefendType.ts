import {
  calcResultType,
  PokemonTypeName,
  PokemonTypeDetails,
} from '@/types/common';

import { POKEMON_TYPE_INFO, POKEMON_TYPE_ARRAY } from '@/constants/contents';

import calcSingleDefendType from './calcSingleDefendType';
import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcDefendAbility from './calcDefendAbility';

export default function calcDefendType(
  first: PokemonTypeName | null,
  second: PokemonTypeName | null,
  ability?: string | null,
): calcResultType {
  const damageMap = new Map<string, PokemonTypeName[]>();

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
      score = 0;
    }
    if (firstType.halfDamage.find((t) => t === type)) {
      score *= 0.5;
    }
    if (firstType.doubleDamage.find((t) => t === type)) {
      score *= 2;
    }
    if (secondType.halfDamage.find((t) => t === type)) {
      score *= 0.5;
    }
    if (secondType.doubleDamage.find((t) => t === type)) {
      score *= 2;
    }
    if (ability) {
      score = calcDefendAbility(ability, score, type, [first, second]);
    }
    addToMap(damageMap, '' + score, type);
  });

  return sortedMap(damageMap);
}
