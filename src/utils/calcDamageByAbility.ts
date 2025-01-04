import { PokemonTypeName } from '@/types/common';

import { EffectMultiplier } from '@/constants/contents';

export default function calcDamageByAbility(
  ability: string,
  score: number,
  type: PokemonTypeName,
  myType: PokemonTypeName | PokemonTypeName[],
) {
  if (ability === '건조피부') {
    if (type === 'fire') return score * EffectMultiplier.BOOST;
    if (type === 'water') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '내열') {
    if (type === 'fire') return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === '노릇노릇바디') {
    if (type === 'fire') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '델타스트림') {
    if (myType.indexOf('flying') >= 0 || myType === 'flying') {
      if (type === 'electric' || type === 'rock' || type === 'ice')
        return score * EffectMultiplier.HALF;
    }
    return score;
  }

  if (ability === '두꺼운지방') {
    if (type === 'fire' || type === 'ice') return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === '마중물') {
    if (type === 'water') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '복슬복슬') {
    if (type === 'fire') return score * EffectMultiplier.DOUBLE;
    return score;
  }

  if (ability === '부유') {
    if (type === 'ground') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '불가사의부적') {
    if (score < 2) return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '수포') {
    if (type === 'fire') return score * EffectMultiplier.HALF;
    return score;
  }

  if (ability === '저수') {
    if (type === 'water') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '전기엔진') {
    if (type === 'electric') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '정화의소금') {
    if (type === 'ghost') return score * EffectMultiplier.NONE;
    return score;
  }

  if (ability === '축전') {
    if (type === 'electric') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '타오르는불꽃') {
    if (type === 'fire') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '테라셀') {
    return score === 0 ? EffectMultiplier.NONE : EffectMultiplier.HALF;
  }

  if (ability === '피뢰침') {
    if (type === 'electric') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '필터') {
    return score < 2 ? score : score * EffectMultiplier.REDUCED;
  }

  if (ability === '흙먹기') {
    if (type === 'ground') return EffectMultiplier.NONE;
    return score;
  }

  if (ability === '흡수') {
    if (type === 'grass') return EffectMultiplier.NONE;
    return score;
  }

  return score;
}
