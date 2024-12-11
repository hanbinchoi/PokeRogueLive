import {
  FieldType,
  MoveDetailProps,
  PokemonDataProps,
  PokemonStatsProps,
  WeatherType,
} from '@/types/common';

import getMod1 from './getMod1';
import getRandomPower from './getRandomPower';
import getDefendEffectiveness from './getDefendEffectiveness';
import getFieldValue from './getFieldValue';

export default function calcPower(
  attackPokemon: PokemonDataProps | null,
  defendPokemon: PokemonDataProps | null,
  attackPokemonStats: PokemonStatsProps | null,
  defendPokemonStats: PokemonStatsProps | null,
  move: MoveDetailProps | undefined,
  weather: WeatherType,
  field: FieldType | null,
  isWeaknessHit: boolean,
) {
  if (
    !attackPokemonStats ||
    !defendPokemonStats ||
    !attackPokemon ||
    !defendPokemon ||
    !move ||
    move.damage_class.name === 'status'
  )
    return 0;

  const { power, type, damage_class } = move;

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
  const defendTypeEffectiveness = getDefendEffectiveness(
    defendPokemon.type,
    move.type.name,
  );
  const mod1 = getMod1(weather, type.name);
  const fieldValue = getFieldValue(field, move.type.name, defendPokemon.type);
  const random = getRandomPower();
  const weaknessPower = isWeaknessHit ? 1.5 : 1;

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

  return damage;
}
