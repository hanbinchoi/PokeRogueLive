import { PokemonType, SpecialDefendAbilityType } from '@/types/common';

import {
  EffectMultiplier,
  PokemonTypeName,
  SpecialDefendAbility,
} from '@/constants/contents';

/**
 * 방어 특성에 따라 데미지 배수를 계산하는 함수
 * @param ability - 방어 특성 (`SpecialDefendAbilityType`)
 * @param score - 기본 데미지 값 (`number`)
 * @param type - 공격 타입 (`PokemonType`)
 * @param checkedType - 체크된 포켓몬 타입 (`PokemonType[]`)
 * @returns 계산된 데미지 배율
 */
export default function calcDefendDamageMultiplier(
  ability: SpecialDefendAbilityType,
  score: number,
  type: PokemonType,
  checkedType: PokemonType[],
): number {
  if (ability === SpecialDefendAbility.DRY_SKIN) {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.BOOST;
    if (type === PokemonTypeName.WATER) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.HEAT_PROOF) {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === SpecialDefendAbility.CRUNCH_BODY) {
    if (type === PokemonTypeName.FIRE) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.DELTA_STREAM) {
    if (checkedType.indexOf(PokemonTypeName.FLYING) >= 0) {
      if (
        type === PokemonTypeName.ELECTRIC ||
        type === PokemonTypeName.ROCK ||
        type === PokemonTypeName.ICE
      )
        return score * EffectMultiplier.HALF;
    }
    return score;
  }

  if (ability === SpecialDefendAbility.FAT_BODY) {
    if (type === PokemonTypeName.FIRE || type === PokemonTypeName.ICE)
      return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === SpecialDefendAbility.WATER_ABSORB) {
    if (type === PokemonTypeName.WATER) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.FLUFFY) {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.DOUBLE;
    return score;
  }

  if (ability === SpecialDefendAbility.LEVITATE) {
    if (type === PokemonTypeName.GROUND) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.MYSTIC_WARD) {
    if (score < EffectMultiplier.DOUBLE) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.LIQUID_OOZE) {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === SpecialDefendAbility.WATER_STORAGE) {
    if (type === PokemonTypeName.WATER) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.ELECTRIC_ENGINE) {
    if (type === PokemonTypeName.ELECTRIC) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.PURIFYING_SALT) {
    if (type === PokemonTypeName.GHOST) return score * EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.CHARGED) {
    if (type === PokemonTypeName.ELECTRIC) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.BLAZING_BODY) {
    if (type === PokemonTypeName.FIRE) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.TERASTAL) {
    return score * EffectMultiplier.HALF;
  }

  if (ability === SpecialDefendAbility.LIGHTNING_ROD) {
    if (type === PokemonTypeName.ELECTRIC) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.FILTER) {
    return score < EffectMultiplier.DOUBLE
      ? score
      : score * EffectMultiplier.REDUCED;
  }

  if (ability === SpecialDefendAbility.SAND_EATER) {
    if (type === PokemonTypeName.GROUND) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === SpecialDefendAbility.ABSORB) {
    if (type === PokemonTypeName.GRASS) return EffectMultiplier.NONE;
    return score;
  }

  // 특성이 조건을 충족하지 못할 시 그대로 리턴
  return score;
}
