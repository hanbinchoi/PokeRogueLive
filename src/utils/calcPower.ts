import getMod1 from './getMod1';
import getRandomPower from './getRandomPower';
import getDefendEffectiveness from './getDefendEffectiveness';
import getFieldValue from './getFieldValue';

import {
  DamageContextProps,
  FieldType,
  MoveDetailProps,
  PokemonDataProps,
  PokemonStatsProps,
  WeatherType,
} from '@/types/common';

export interface calcPowerProps {
  attackPokemon: PokemonDataProps;
  defendPokemon: PokemonDataProps;
  attackPokemonStats: PokemonStatsProps;
  defendPokemonStats: PokemonStatsProps;
  MoveDetail: MoveDetailProps;
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
    ? 1.5
    : 1;
  damageContext.sameTypeEffectiveness =
    sameTypeEffectiveness === 1.5
      ? '자속 보정으로 인해 데미지가 1.5배 증가'
      : null;

  const defendTypeEffectiveness = getDefendEffectiveness(
    defendPokemon.type,
    MoveDetail.type.name,
  );
  if (defendTypeEffectiveness !== 1) {
    damageContext.defendTypeEffectiveness =
      defendTypeEffectiveness > 1
        ? `방어 측의 타입으로 인해 데미지가 ${defendTypeEffectiveness}배 증가`
        : `방어 측의 타입으로 인해 데미지가 ${defendTypeEffectiveness}배 감소`;
  }

  const mod1 = getMod1(weather, type.name);
  if (mod1 !== 1) {
    damageContext.mod1 =
      mod1 > 1
        ? `날씨의 영향으로 인해 데미지가 ${mod1}배 증가`
        : `날씨의 영향으로 인해 데미지가 ${mod1}배 감소`;
  }

  const fieldValue = getFieldValue(
    field,
    MoveDetail.type.name,
    defendPokemon.type,
  );
  if (fieldValue !== 1) {
    damageContext.fieldValue =
      fieldValue > 1
        ? `필드의 영향으로 인해 데미지가 ${fieldValue}배 증가`
        : `필드의 영향으로 인해 데미지가 ${fieldValue}배 감소`;
  }

  const weaknessPower = isWeaknessHit ? 1.5 : 1;
  damageContext.weaknessPower =
    weaknessPower === 1.5
      ? '공격 측의 급소 타격으로 인해 데미지가 1.5배 증가'
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
