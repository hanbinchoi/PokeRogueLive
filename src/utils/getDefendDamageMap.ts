import {
  calcResultType,
  PokemonType,
  SpecialDefendAbilityType,
} from '@/types/common';

import {
  POKEMON_TYPE_INFO,
  EffectMultiplier,
  PokemonTypeName,
} from '@/constants/contents';

import addToMap from './addToMap';
import sortedMap from './sortedMap';
import calcDefendDamageMultiplier from './calcDefendDamageMultiplier';

/**
 * 주어진 포켓몬 타입, 특성에 따라 방어 측 피해 배율을 계산하고, 이를 기반으로
 * 각 타입별 방어 데미지 맵을 생성하여 반환하는 함수.
 *
 * @param checkedTypes - 선택된 포켓몬 타입 (`PokemonType[]`)
 * @param ability - 방어 포켓몬 특성 (`string | null`)
 * @returns 방어 타입에 대한 피해 배율을 정렬한 맵 (`calcResultType`)
 */
export default function getDefendDamageMap(
  checkedTypes: (PokemonType | null)[],
  ability: SpecialDefendAbilityType | null,
): calcResultType | null {
  const damageMap = new Map<number, PokemonType[]>();
  const allType = Object.values(PokemonTypeName);

  const filteredTypes = checkedTypes.filter((type) => type !== null);

  if (!filteredTypes.length) return null;

  // 중복된 타입을 제거하여 선택된 방어 포켓몬 타입 정보 가져오기
  const typeInfos = Array.from(new Set(filteredTypes)).map(
    (t) => POKEMON_TYPE_INFO[t],
  );

  // 모든 포켓몬 타입에 대해 방어 데미지 계산
  allType.forEach((type) => {
    let score = EffectMultiplier.NORMAL;

    // 'unknown' 타입은 계산에서 제외
    if (type === PokemonTypeName.UNKNOWN) return;

    // 선택된 방어 포켓몬 타입에 대해 피해 배율을 계산
    if (typeInfos.some((info) => info.noDamage.includes(type))) {
      score = EffectMultiplier.NONE;
    } else {
      typeInfos.forEach((info) => {
        if (info.halfDamage.includes(type)) {
          score *= EffectMultiplier.HALF;
        }
        if (info.doubleDamage.includes(type)) {
          score *= EffectMultiplier.DOUBLE;
        }
      });
    }

    // 특성에 따른 추가 피해 배율 조정
    if (ability) {
      score = calcDefendDamageMultiplier(ability, score, type, filteredTypes);
    }

    addToMap(damageMap, score, type);
  });

  // 키 값을 기준으로 내림차순으로 정렬 후 리턴
  return sortedMap(damageMap);
}
