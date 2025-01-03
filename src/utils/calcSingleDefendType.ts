import {
  calcResultType,
  PokemonTypeName,
  PokemonTypeDetails,
} from '@/types/common';

import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcDefendAbility from './calcDefendAbility';

import { EffectMultiplier, POKEMON_TYPE_ARRAY } from '@/constants/contents';

export default function calcSingleDefendType(
  defendType: PokemonTypeDetails,
  defendTypeName: PokemonTypeName,
  ability?: string | null,
): calcResultType {
  const damageMap = new Map<number, PokemonTypeName[]>();

  POKEMON_TYPE_ARRAY.forEach((type) => {
    let score = 1;
    if (type === 'unknown') return;

    if (defendType.noDamage.find((t) => t === type)) {
      score = EffectMultiplier.NONE;
    }
    if (defendType.halfDamage.find((t) => t === type)) {
      score *= EffectMultiplier.HALF;
    }
    if (defendType.doubleDamage.find((t) => t === type)) {
      score *= EffectMultiplier.DOUBLE;
    }
    if (ability) {
      score = calcDefendAbility(ability, score, type, defendTypeName);
    }
    addToMap(damageMap, score, type);
  });
  return sortedMap(damageMap);
}
