import { calcResultType, PokemonTypeName } from '@/types/common';

import {
  POKEMON_TYPE_INFO,
  POKEMON_TYPE_ARRAY,
  EffectMultiplier,
} from '@/constants/contents';

import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcDefendDamageMultiplier from './calcDefendDamageMultiplier';

export default function getDefendDamageMap(
  checkedTypes: PokemonTypeName[],
  ability: string | null,
): calcResultType {
  const damageMap = new Map<number, PokemonTypeName[]>();

  const typeInfos = Array.from(new Set(checkedTypes)).map(
    (t) => POKEMON_TYPE_INFO[t],
  );

  POKEMON_TYPE_ARRAY.forEach((type) => {
    let score = EffectMultiplier.NORMAL;
    if (type === 'unknown') return;

    if (typeInfos.some((info) => info.noDamage.includes(type))) {
      score = EffectMultiplier.NONE;
    } else {
      typeInfos.forEach((info) => {
        if (info.halfDamage.includes(type)) {
          score *= EffectMultiplier.HALF;
        }
        if (info.doubleDamage.includes(type)) {
          score *= EffectMultiplier.DOUBLE;
        }
      });
    }

    if (ability) {
      score = calcDefendDamageMultiplier(ability, score, type, checkedTypes);
    }
    addToMap(damageMap, score, type);
  });

  return sortedMap(damageMap);
}
