import getMod1 from './getMod1';
import getRandomPower from './getRandomPower';
import getDefendEffectiveness from './getDefendEffectiveness';
import getFieldValue from './getFieldValue';

import {
  DamageContextProps,
  FieldType,
  PokemonDetailProps,
  PokemonStatsProps,
  WeatherType,
} from '@/types/common';
import { MoveDetailDataProps } from '@/types/data';

import { EffectMultiplier } from '@/constants/contents';

export interface calcPowerProps {
  attackPokemon: PokemonDetailProps;
  defendPokemon: PokemonDetailProps;
  attackPokemonStats: PokemonStatsProps;
  defendPokemonStats: PokemonStatsProps;
  MoveDetail: MoveDetailDataProps;
  weather: WeatherType;
  field: FieldType;
  isWeaknessHit: boolean;
}

export default function calcPower({
  attackPokemon,
  defendPokemon,
  attackPokemonStats,
  defendPokemonStats,
  MoveDetail,
  weather,
  field,
  isWeaknessHit,
}: calcPowerProps) {
  const { power, type, damage_class } = MoveDetail;
  const damageContext: DamageContextProps = {
    sameTypeEffectiveness: null,
    defendTypeEffectiveness: null,
    mod1: null,
    fieldValue: null,
    weaknessPower: null,
    random: '랜덤변수 85~100 적용',
  };

  const pokemonPower =
    damage_class.name === 'physical'
      ? attackPokemonStats['attack']
      : attackPokemonStats['special-attack'];

  const pokemonDefend =
    damage_class.name === 'physical'
      ? defendPokemonStats.defense
      : defendPokemonStats['special-defense'];

  const sameTypeEffectiveness = attackPokemon.type.find((t) => t === type.name)
    ? EffectMultiplier.STRONG
    : EffectMultiplier.NORMAL;
  damageContext.sameTypeEffectiveness =
    sameTypeEffectiveness === EffectMultiplier.STRONG
      ? `'자속 보정으로 인해 데미지가 ${EffectMultiplier.STRONG}배 증가'`
      : null;

  const defendTypeEffectiveness = getDefendEffectiveness(
    defendPokemon.type,
    MoveDetail.type.name,
  );
  if (defendTypeEffectiveness !== EffectMultiplier.NORMAL) {
    damageContext.defendTypeEffectiveness =
      defendTypeEffectiveness > EffectMultiplier.NORMAL
        ? `방어 측의 타입으로 인해 데미지가 ${defendTypeEffectiveness}배 증가`
        : `방어 측의 타입으로 인해 데미지가 ${defendTypeEffectiveness}배 감소`;
  }

  const mod1 = getMod1(weather, type.name);
  if (mod1 !== EffectMultiplier.NORMAL) {
    damageContext.mod1 =
      mod1 > EffectMultiplier.NORMAL
        ? `날씨의 영향으로 인해 데미지가 ${mod1}배 증가`
        : `날씨의 영향으로 인해 데미지가 ${mod1}배 감소`;
  }

  const fieldValue = getFieldValue(
    field,
    MoveDetail.type.name,
    defendPokemon.type,
  );
  if (fieldValue !== EffectMultiplier.NORMAL) {
    damageContext.fieldValue =
      fieldValue > EffectMultiplier.NORMAL
        ? `필드의 영향으로 인해 데미지가 ${fieldValue}배 증가`
        : `필드의 영향으로 인해 데미지가 ${fieldValue}배 감소`;
  }

  const weaknessPower = isWeaknessHit
    ? EffectMultiplier.STRONG
    : EffectMultiplier.NORMAL;
  damageContext.weaknessPower =
    weaknessPower === EffectMultiplier.STRONG
      ? `공격 측의 급소 타격으로 인해 데미지가 ${EffectMultiplier.STRONG}배 증가`
      : null;

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
                  power *
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

  return { newDamages, damageContext };
}
