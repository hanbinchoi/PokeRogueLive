import { PokemonType } from '@/types/common';

import { EffectMultiplier } from '@/constants/contents';

import getDefendDamageMap from './getDefendDamageMap';

/**
 * 특정 포켓몬 타입에 대해 사용된 기술의 타입에 따른 방어 효과 배율을 계산하는 함수.
 *
 * @param pokemonType - 방어하는 포켓몬의 타입 배열 (`PokemonType[]`)
 * @param moveType - 공격하는 기술의 타입 (`PokemonType`)
 *
 * @returns 방어 타입의 효과 배율 (`number`), 기본값은 `EffectMultiplier.NORMAL`
 *
 * 방어 포켓몬의 타입에 맞는 방어 효과 배율을 계산하여 반환. 기술 타입에 따라 방어 효과 배율이 달라지며,
 * 해당하는 효과가 없으면 기본적으로 `EffectMultiplier.NORMAL`을 반환.
 */
export default function getDefendEffectiveness(
  pokemonType: PokemonType[],
  moveType: PokemonType,
): number {
  const typeEffectivenessMap = getDefendDamageMap(pokemonType, null);

  if (!typeEffectivenessMap) return EffectMultiplier.NORMAL;

  for (let [effectiveness, types] of typeEffectivenessMap.entries()) {
    if (types.includes(moveType)) {
      return effectiveness;
    }
  }
  return EffectMultiplier.NORMAL;
}
