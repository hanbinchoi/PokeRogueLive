import {
  calcResultType,
  PokemonType,
  SpecialAttackAbilityType,
  SpecialAttackMoveType,
} from '@/types/common';

import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcAttackDamageMultiplier from './calcAttackDamageMultiplier';

import { EXCLUDED_TYPES, PokemonTypeName } from '@/constants/contents';
/**
 * 주어진 포켓몬 타입, 특성, 기술에 따라 공격 측 피해 배율을 계산하고, 이를 기반으로
 * 각 타입별 공격 데미지 맵을 생성하여 반환하는 함수.
 *
 * @param checkedType - 선택된 포켓몬 타입 (`PokemonType[]`)
 * @param attackAbility - 공격 포켓몬 특성 (`SpecialAttackAbilityType | null `)
 * @param attackMove - 공격 포켓몬 기술 (`SpecialAttackMoveType | null `)
 * @returns 공격 타입에 대한 피해 배율을 정렬한 맵 (`calcResultType`)
 */
export default function getAttackDamageMap(
  checkedType: PokemonType[],
  attackAbility: SpecialAttackAbilityType | null,
  attackMove: SpecialAttackMoveType | null,
): calcResultType | null {
  const effectMap = new Map<number, PokemonType[]>();
  const allType = Object.values(PokemonTypeName);

  // 모든 포켓몬 타입에 대해 효과 배율을 계산
  allType.forEach((type) => {
    // 제외된 타입은 계산 스킵
    if (EXCLUDED_TYPES.has(type)) return;

    // 타입별로 효과 배율을 계산
    const multiplier = calcAttackDamageMultiplier(
      type,
      checkedType,
      attackAbility,
      attackMove,
    );

    addToMap(effectMap, multiplier, type);
  });

  // 키 값을 기준으로 내림차순으로 정렬 후 리턴
  return sortedMap(effectMap);
}
