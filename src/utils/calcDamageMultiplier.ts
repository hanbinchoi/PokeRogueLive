import {
  PokemonTypeName,
  SpecialAttackAbilityType,
  SpecialAttackMoveType,
} from '@/types/common';

import {
  EffectMultiplier,
  SpecialAttackMove,
  SpecialAttackAbility,
  POKEMON_TYPE_INFO,
} from '@/constants/contents';

/**
 * 포켓몬 타입과 선택된 조건에 따라 데미지 배율을 계산하는 함수.
 * @param type - 현재 계산 할 포켓몬 타입 (`PokemonTypeName`)
 * @param checkedType - 체크된 공격 타입 (`PokemonTypeName[]`)
 * @param attackAbility - 공격 포켓몬 특성 (`SpecialAttackAbilityType | null`)
 * @param attackMove - 공격 포켓몬 기술 (`SpecialAttackMoveType | null`)
 * @returns 계산된 데미지 배율
 */
export default function calcDamageMultiplier(
  type: PokemonTypeName,
  checkedType: PokemonTypeName[],
  attackAbility: SpecialAttackAbilityType | null,
  attackMove: SpecialAttackMoveType | null,
): EffectMultiplier {
  // 체크된 타입들 중 가장 높은 데미지
  const highestDamage = checkedType
    .map((t) => {
      if (POKEMON_TYPE_INFO[type].doubleDamage.includes(t))
        return EffectMultiplier.DOUBLE;
      if (POKEMON_TYPE_INFO[type].halfDamage.includes(t))
        return EffectMultiplier.HALF;
      if (POKEMON_TYPE_INFO[type].noDamage.includes(t))
        return EffectMultiplier.NONE;

      return EffectMultiplier.NORMAL;
    })
    .reduce((acc, cur) => (cur > acc ? cur : acc), -Infinity);

  if (
    highestDamage === EffectMultiplier.HALF &&
    attackAbility === SpecialAttackAbility.GLASSES
  ) {
    return EffectMultiplier.NORMAL;
  }

  if (
    attackMove === SpecialAttackMove.THOUSAND_ARROWS &&
    type === 'flying' &&
    highestDamage < EffectMultiplier.NORMAL
  ) {
    return EffectMultiplier.NORMAL;
  }

  if (attackMove === SpecialAttackMove.FREEZE_DRY && type === 'water') {
    return EffectMultiplier.DOUBLE;
  }

  if (
    attackAbility === SpecialAttackAbility.PERSEVERANCE &&
    type === 'ghost' &&
    highestDamage < EffectMultiplier.NORMAL
  ) {
    return EffectMultiplier.NORMAL;
  }

  // 특성, 기술이 없거나 조건을 만족하지 못한 경우 가장 높은 데미지를 리턴
  return highestDamage;
}
