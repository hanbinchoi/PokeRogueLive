import {
  calcDefendTypeProps,
  PokemonType,
  PokemonTypeDetails,
} from '@/types/common';

import { POKEMON_TYPE, POKEMON_TYPE_ARRAY } from '@/constants/contents';
import addToMap from './addToMap';
import sortedMap from './sortedMap';

export default function calcSingleDefendType(
  defendType: PokemonTypeDetails,
): calcDefendTypeProps {
  const damageMap = new Map<string, PokemonType[]>();

  POKEMON_TYPE_ARRAY.forEach((type) => {
    let score = 1;
    if (type === 'unknown') return;

    if (defendType.noDamage.find((t) => t === type)) {
      score = 0;
    }
    if (defendType.halfDamage.find((t) => t === type)) {
      score *= 0.5;
    }
    if (defendType.doubleDamage.find((t) => t === type)) {
      score *= 2;
    }

    addToMap(damageMap, '' + score, type);
  });
  return sortedMap(damageMap);
}
