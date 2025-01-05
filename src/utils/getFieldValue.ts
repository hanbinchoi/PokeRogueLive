import { FieldType, PokemonType } from '@/types/common';

import { EffectMultiplier, Field, PokemonTypeName } from '@/constants/contents';

/**
 * 필드 상태와 공격 기술 타입을 바탕으로 데미지 배율을 계산하는 함수.
 *
 * @param field - 현재 필드 상태 (`FieldType`)
 * @param attackMoveType - 공격하는 기술의 타입 (`PokemonType`)
 * @param defendPokemonType - 방어하는 포켓몬의 타입 목록 (`PokemonType[]`)
 *
 * @returns 필드와 기술 타입에 따른 데미지 배율 (`number`)

 */
export default function getFieldValue(
  field: FieldType,
  attackMoveType: PokemonType,
  defendPokemonType: PokemonType[],
) {
  // 비행타입은 필드의 영향을 받지 않음
  if (defendPokemonType.includes(PokemonTypeName.FLYING))
    return EffectMultiplier.NORMAL;

  if (field === Field.ELECTRIC) {
    return attackMoveType === PokemonTypeName.ELECTRIC
      ? EffectMultiplier.STRONG
      : EffectMultiplier.NORMAL;
  }
  if (field === Field.MIST) {
    return attackMoveType === PokemonTypeName.DRAGON
      ? EffectMultiplier.HALF
      : EffectMultiplier.NORMAL;
  }
  if (field === Field.PSYCHIC) {
    return attackMoveType === PokemonTypeName.PSYCHIC
      ? EffectMultiplier.STRONG
      : EffectMultiplier.NORMAL;
  }
  if (field === Field.GRASS) {
    return attackMoveType === PokemonTypeName.GRASS
      ? Math.ceil(EffectMultiplier.BOOST)
      : EffectMultiplier.NORMAL;
  }

  return EffectMultiplier.NORMAL;
}
