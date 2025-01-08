import {
  DamageContextProps,
  FieldType,
  PokemonDetailProps,
  WeatherType,
} from '@/types/common';
import { MoveDetailDataProps } from '@/types/data';

import getPokemonStatMap from './getPokemonStatMap';
import getDefendEffectiveness from './getDefendEffectiveness';
import getMod1 from './getMod1';
import getFieldValue from './getFieldValue';
import getRandomPower from './getRandomPower';

import { EffectMultiplier, MoveClass } from '@/constants/contents';

/** 포켓몬 능력치, 기술, 조건 등을 이용하여 데미지를 구하는 함수.
 *
 * @param attackPokemon - 공격하는 포켓몬의 상세 정보 (`PokemonDetailProps`)
 * @param defendPokemon - 방어하는 포켓몬의 상세 정보 (`PokemonDetailProps`)
 * @param MoveDetail - 사용되는 기술의 상세 정보 (`MoveDetailDataProps`)
 * @param weather - 현재 날씨 상태 (`WeatherType | null`)
 * @param field - 현재 필드 상태 (`FieldType | null`)
 * @param isWeaknessHit - 약점 타격 여부 (`boolean`)
 *
 * @returns 계산된 데미지 값과 계산 근거 (`{ damages : number[], damageContext: damageContextProps }`)
 *
 */
export default function getDamages({
  attackPokemon,
  defendPokemon,
  MoveDetail,
  weather,
  field,
  isWeaknessHit,
}: {
  attackPokemon: PokemonDetailProps;
  defendPokemon: PokemonDetailProps;
  MoveDetail: MoveDetailDataProps;
  weather: WeatherType | null;
  field: FieldType | null;
  isWeaknessHit: boolean;
}) {
  // 공격, 방어 포켓몬의 스탯을 맵 형태로 변환
  const attackPokemonStats = getPokemonStatMap(attackPokemon);
  const defendPokemonStats = getPokemonStatMap(defendPokemon);

  // 포켓몬 기술 구조분해 할당
  const {
    power: movePower,
    type: { name: moveType },
    damage_class: { name: damageClass },
  } = MoveDetail;

  // 데미지 계산 근거를 담기위한 객체
  const damageContext: DamageContextProps = {
    sameTypeEffectiveness: null,
    defendTypeEffectiveness: null,
    mod1: null,
    fieldValue: null,
    weaknessPower: null,
    random: '랜덤변수 85~100 적용',
  };

  // 물리 기술일 경우 공격(방어)을 기준으로, 특수 기술일 경우 특수공격(특수방어)을 기준으로 위력 설정
  const pokemonPower =
    damageClass === MoveClass.PHYSICAL
      ? attackPokemonStats.attack
      : attackPokemonStats['special-attack'];
  const pokemonDefend =
    damageClass === MoveClass.PHYSICAL
      ? defendPokemonStats.defense
      : defendPokemonStats['special-defense'];

  // 공격 포켓몬이 자속 보정을 받는지 여부
  const isSameType = attackPokemon.type.includes(moveType);
  const sameTypeEffectiveness = isSameType
    ? EffectMultiplier.STRONG
    : EffectMultiplier.NORMAL;
  damageContext.sameTypeEffectiveness = isSameType
    ? `'자속 보정으로 인해 데미지가 ${EffectMultiplier.STRONG}배 증가'`
    : null;

  // 방어 포켓몬의 타입과 공격 기술간의 데미지 배율 계산
  const defendTypeEffectiveness = getDefendEffectiveness(
    defendPokemon.type,
    moveType,
  );
  if (defendTypeEffectiveness !== EffectMultiplier.NORMAL) {
    const effectMessage =
      defendTypeEffectiveness > EffectMultiplier.NORMAL ? '증가' : '감소';

    damageContext.defendTypeEffectiveness = `방어 측의 타입으로 인해 데미지가 ${defendTypeEffectiveness}배 ${effectMessage}`;
  }

  // 현재 날씨를 바탕으로 Mod1값("날씨 상태에 따른 공격력 보정값") 구하기
  const mod1 = weather ? getMod1(weather, moveType) : EffectMultiplier.NORMAL;
  if (mod1 !== EffectMultiplier.NORMAL) {
    const effectMessage = mod1 > EffectMultiplier.NORMAL ? '증가' : '감소';
    damageContext.mod1 = `날씨의 영향으로 인해 데미지가 ${mod1}배 ${effectMessage}`;
  }

  // 현재 필드 상태를 기준으로 데미지 배율 계산
  const fieldValue = field
    ? getFieldValue(field, moveType, defendPokemon.type)
    : EffectMultiplier.NORMAL;
  if (fieldValue !== EffectMultiplier.NORMAL) {
    const effectMessage =
      fieldValue > EffectMultiplier.NORMAL ? '증가' : '감소';
    damageContext.fieldValue = `필드의 영향으로 인해 데미지가 ${fieldValue}배 ${effectMessage}`;
  }

  // 약점 타격 여부
  const weaknessPower = isWeaknessHit
    ? EffectMultiplier.STRONG
    : EffectMultiplier.NORMAL;
  damageContext.weaknessPower =
    weaknessPower === EffectMultiplier.STRONG
      ? `공격 측의 급소 타격으로 인해 데미지가 ${EffectMultiplier.STRONG}배 증가`
      : null;

  /**
   * 데미지 계산은 랜덤 변수의 값을 고려해 10회 계산.
   * 계산 방식은 포켓몬 공식 위키피디아 참조 (`https://pokemon.fandom.com/ko/wiki/%EB%8D%B0%EB%AF%B8%EC%A7%80`)
   * 1. 공격 포켓몬의 레벨, 기술의 위력, 공격력 및 방어력 등을 기반으로 계산
   * 2. 최종 데미지에 대해 여러 조건(날씨, 필드, 약점 등)을 반영
   * 3. 결과적으로 10번의 랜덤 계산을 통해 데미지 값을 구함
   */
  const newDamages = [];
  for (let i = 0; i < 10; i++) {
    const random = getRandomPower();
    const damage = Math.floor(
      Math.floor(
        Math.floor(
          ((Math.floor(
            Math.floor(
              Math.floor(
                ((Math.floor((attackPokemonStats.lv * 2) / 5) + 2) *
                  movePower *
                  pokemonPower) /
                  50,
              ) / pokemonDefend,
            ) * mod1,
          ) +
            2) *
            weaknessPower *
            1 *
            random) /
            100,
        ) *
          sameTypeEffectiveness *
          defendTypeEffectiveness *
          1,
      ) * fieldValue,
    );
    newDamages.push(damage);
  }

  // 데미지 결과 값과 계산 근거를 리턴.
  return { newDamages, damageContext };
}
