import {
  calcDefendTypeProps,
  PokemonType,
  PokemonTypeDetails,
} from '@/types/common';

import { POKEMON_TYPE, POKEMON_TYPE_ARRAY } from '@/constants/contents';
export default function calcDefendType(
  first: PokemonType | null,
  second: PokemonType | null,
): calcDefendTypeProps | null {
  if (!first && second) {
    const { noDamage, halfDamage, doubleDamage } = POKEMON_TYPE[
      second
    ] as PokemonTypeDetails;

    // 1배 데미지는 전체 타입에서 데미지 배열에 추가된 타입을 빼줌
    const excludeSet = new Set([noDamage, doubleDamage].flat());
    const damage = POKEMON_TYPE_ARRAY.filter(
      (item) => !excludeSet.has(item),
    ).filter((item) => item !== 'unknown');

    return { noDamage, halfDamage, doubleDamage, damage };
  }

  if (first && !second) {
    const { noDamage, halfDamage, doubleDamage } = POKEMON_TYPE[
      first
    ] as PokemonTypeDetails;

    const excludeSet = new Set([noDamage, doubleDamage, halfDamage].flat());
    const damage = POKEMON_TYPE_ARRAY.filter(
      (item) => !excludeSet.has(item),
    ).filter((item) => item !== 'unknown');

    return { noDamage, halfDamage, doubleDamage, damage };
  }

  if (first && second) {
    if (first === second) {
      const { noDamage, halfDamage, doubleDamage } = POKEMON_TYPE[
        second
      ] as PokemonTypeDetails;

      // 1배 데미지는 전체 타입에서 데미지 배열에 추가된 타입을 빼줌
      const excludeSet = new Set([noDamage, doubleDamage, halfDamage].flat());
      const damage = POKEMON_TYPE_ARRAY.filter(
        (item) => !excludeSet.has(item),
      ).filter((item) => item !== 'unknown');

      return { noDamage, halfDamage, doubleDamage, damage };
    }

    const firstType = POKEMON_TYPE[first] as PokemonTypeDetails;
    const secondType = POKEMON_TYPE[second] as PokemonTypeDetails;

    const noDamage: PokemonType[] = [];
    const damage: PokemonType[] = [];
    const quarterDamage: PokemonType[] = [];
    const halfDamage: PokemonType[] = [];
    const doubleDamage: PokemonType[] = [];
    const quadrupleDamage: PokemonType[] = [];

    let score = 0;

    POKEMON_TYPE_ARRAY.forEach((type) => {
      score = 0;
      if (type === 'unknown') return;
      if (
        firstType.noDamage.find((t) => t === type) ||
        secondType.noDamage.find((t) => t === type)
      ) {
        noDamage.push(type);
        return;
      }

      if (firstType.halfDamage.find((t) => t === type)) {
        score -= 1;
      }

      if (firstType.doubleDamage.find((t) => t === type)) {
        score += 1;
      }
      if (secondType.halfDamage.find((t) => t === type)) {
        score -= 1;
      }

      if (secondType.doubleDamage.find((t) => t === type)) {
        score += 1;
      }

      switch (score) {
        case -2: {
          quarterDamage.push(type);
          break;
        }
        case -1: {
          halfDamage.push(type);
          break;
        }
        case 0: {
          damage.push(type);
          break;
        }
        case 1: {
          doubleDamage.push(type);
          break;
        }
        case 2: {
          quadrupleDamage.push(type);
          break;
        }
      }
    });

    return {
      noDamage,
      quarterDamage,
      halfDamage,
      damage,
      doubleDamage,
      quadrupleDamage,
    };
  }
  return null;
}
