import {
  calcDefendTypeProps,
  PokemonType,
  PokemonTypeDetails,
} from '@/types/common';

import { POKEMON_TYPE, POKEMON_TYPE_ARRAY } from '@/constants/contents';
import calcSingleDefendType from './calcSingleDefendType';
import addToMap from './addToMap';
import sortedMap from './sortedMap';

export default function calcDefendType(
  first: PokemonType | null,
  second: PokemonType | null,
): calcDefendTypeProps {
  const damageMap = new Map<string, PokemonType[]>();

  if (first === null) {
    if (second)
      return calcSingleDefendType(POKEMON_TYPE[second] as PokemonTypeDetails);

    return null;
  }
  if (second === null) {
    if (first)
      return calcSingleDefendType(POKEMON_TYPE[first] as PokemonTypeDetails);

    return null;
  }

  if (first === second) {
    return calcSingleDefendType(POKEMON_TYPE[first] as PokemonTypeDetails);
  }

  const firstType = POKEMON_TYPE[first];
  const secondType = POKEMON_TYPE[second];

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

    addToMap(damageMap, '' + score, type);
  });

  return sortedMap(damageMap);
}
