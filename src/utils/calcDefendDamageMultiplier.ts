import { PokemonType, SpecialDefendAbilityType } from '@/types/common';

import {
  EffectMultiplier,
  PokemonTypeName,
  SpecialDefendAbility,
} from '@/constants/contents';

export default function calcDefendDamageMultiplier(
  ability: SpecialDefendAbilityType,
  score: number,
  type: PokemonType,
  myType: PokemonType[],
) {
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

  return score;
}
