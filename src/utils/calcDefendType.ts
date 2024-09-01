import { calcDefendTypeProps, PokemonType } from '@/types/common';

import { POKEMON_TYPE, POKEMON_TYPE_ARRAY } from '@/constants/contents';

export default function calcDefendType(
  first: PokemonType | null,
  second: PokemonType | null,
): calcDefendTypeProps | null {
  if (!first && !second) {
    return null;
  }
  if (!first && second) {
    const { noDamage, halfDamage, doubleDamage } = POKEMON_TYPE[second];
    return { noDamage, halfDamage, doubleDamage };
  }

  if (first && !second) {
    const { noDamage, halfDamage, doubleDamage } = POKEMON_TYPE[first];
    return { noDamage, halfDamage, doubleDamage };
  }

  if (first && second) {
    const firstType = POKEMON_TYPE[first];
    const secondType = POKEMON_TYPE[second];

    const noDamage = [...firstType.noDamage, ...secondType.noDamage];
    const quarterDamage: string[] = [];
    const halfDamage: string[] = [];
    const doubleDamage: string[] = [];
    const quadrupleDamage: string[] = [];

    // 0.25배와 0.5배 구분
    mergeAndCount(firstType.halfDamage, secondType.halfDamage).forEach(
      (type) => {
        if (type[type.length - 1] === '2')
          quarterDamage.push(type.slice(0, type.length - 1) as PokemonType);
        else halfDamage.push(type as PokemonType);
      },
    );

    // 2배와 4배 구분
    mergeAndCount(firstType.doubleDamage, secondType.doubleDamage).forEach(
      (type) => {
        if (type[type.length - 1] === '2')
          quadrupleDamage.push(type.slice(0, type.length - 1) as PokemonType);
        else doubleDamage.push(type as PokemonType);
      },
    );

    // 1배 데미지는 전체 타입에서 데미지 배열에 추가된 타입을 빼줌
    const excludeSet = new Set(
      [noDamage, quarterDamage, doubleDamage, quadrupleDamage].flat(),
    );
    const damage = POKEMON_TYPE_ARRAY.filter((item) => !excludeSet.has(item));

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

function mergeAndCount(arr1: string[], arr2: string[]): string[] {
  const combinedArray: string[] = [...arr1];
  const elementCount: { [key: string]: number } = {};

  // 첫 번째 배열 요소들에 대해 카운트를 기록
  arr1.forEach((item) => {
    elementCount[item] = 1;
  });

  // 두 번째 배열 요소들에 대해 중복 여부를 판단
  arr2.forEach((item) => {
    if (elementCount[item]) {
      elementCount[item] += 1;
      combinedArray.push(`${item}${elementCount[item]}`);
    } else {
      elementCount[item] = 1;
      combinedArray.push(item);
    }
  });

  return combinedArray;
}

function excludeFromArray<T>(mainArray: T[], ...arraysToExclude: T[][]): T[] {
  // 모든 제외할 배열의 원소를 집합에 추가
  const excludeSet = new Set<T>(arraysToExclude.flat());

  // mainArray에서 제외 집합에 없는 원소만 필터링
  return mainArray.filter((item) => !excludeSet.has(item));
}
