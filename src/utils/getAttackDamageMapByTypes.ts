import {
  calcResultType,
  PokemonTypeName,
  SpecialAttackAbilityType,
  SpecialAttackMoveType,
} from '@/types/common';

import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcAttackDamageMultiplier from './calcAttackDamageMultiplier';

import { POKEMON_TYPE_ARRAY, EXCLUDED_TYPES } from '@/constants/contents';
/**
 * 주어진 포켓몬 타입, 특성, 기술에 대해 공격 타입 데미지 맵을 리턴 하는 함수.
 *
 * @param checkedType - 선택된 타입 (`PokemonTypeName[]`)
 * @param attackAbility - 공격 포켓몬 특성 (`SpecialAttackAbilityType | null `)
 * @param attackMove - 공격 포켓몬 기술 (`SpecialAttackMoveType | null `)
 * @returns 효과 배율에 따라 정렬된 공격 타입 효과 맵(`calcResultType`)
 */
export default function getAttackDamageMapByTypes(
  checkedType: PokemonTypeName[],
  attackAbility: SpecialAttackAbilityType | null,
  attackMove: SpecialAttackMoveType | null,
): calcResultType | null {
  const effectMap = new Map<number, PokemonTypeName[]>();

  // 모든 포켓몬 타입에 대해 효과 배율을 계산
  POKEMON_TYPE_ARRAY.forEach((type) => {
    // 제외된 타입은 계산 스킵
    if (EXCLUDED_TYPES.has(type)) return;

    // 타입별로 효과 배율을 계산
    const multiplier = calcAttackDamageMultiplier(
      type,
      checkedType,
      attackAbility,
      attackMove,
    );

    // 계산된 효율을 키값으로 맵 객체에 타입 추가
    addToMap(effectMap, multiplier, type);
  });

  // 키 값을 기준으로 내림차순으로 정렬 후 리턴
  return sortedMap(effectMap);
}
