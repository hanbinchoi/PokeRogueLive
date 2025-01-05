import { PokemonType, SpecialDefendAbilityType } from '@/types/common';

import { EffectMultiplier, PokemonTypeName } from '@/constants/contents';

export default function calcDefendDamageMultiplier(
  ability: SpecialDefendAbilityType,
  score: number,
  type: PokemonType,
  myType: PokemonType[],
) {
  if (ability === '건조피부') {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.BOOST;
    if (type === PokemonTypeName.WATER) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '내열') {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === '노릇노릇바디') {
    if (type === PokemonTypeName.FIRE) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '델타스트림') {
    if (myType.indexOf(PokemonTypeName.FLYING) >= 0) {
      if (
        type === PokemonTypeName.ELECTRIC ||
        type === PokemonTypeName.ROCK ||
        type === PokemonTypeName.ICE
      )
        return score * EffectMultiplier.HALF;
    }
    return score;
  }

  if (ability === '두꺼운지방') {
    if (type === PokemonTypeName.FIRE || type === PokemonTypeName.ICE)
      return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === '마중물') {
    if (type === PokemonTypeName.WATER) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '복슬복슬') {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.DOUBLE;
    return score;
  }

  if (ability === '부유') {
    if (type === PokemonTypeName.GROUND) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '불가사의부적') {
    if (score < EffectMultiplier.DOUBLE) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '수포') {
    if (type === PokemonTypeName.FIRE) return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === '저수') {
    if (type === PokemonTypeName.WATER) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '전기엔진') {
    if (type === PokemonTypeName.ELECTRIC) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '정화의소금') {
    if (type === PokemonTypeName.GHOST) return score * EffectMultiplier.NONE;
    return score;
  }

  if (ability === '축전') {
    if (type === PokemonTypeName.ELECTRIC) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '타오르는불꽃') {
    if (type === PokemonTypeName.FIRE) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '테라셀') {
    return score * EffectMultiplier.HALF;
  }

  if (ability === '피뢰침') {
    if (type === PokemonTypeName.ELECTRIC) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '필터') {
    return score < EffectMultiplier.DOUBLE
      ? score
      : score * EffectMultiplier.REDUCED;
  }

  if (ability === '흙먹기') {
    if (type === PokemonTypeName.GROUND) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '흡수') {
    if (type === PokemonTypeName.GRASS) return EffectMultiplier.NONE;
    return score;
  }

  return score;
}
