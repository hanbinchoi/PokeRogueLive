import { calcResultType, PokemonTypeName } from '@/types/common';

import {
  POKEMON_TYPE_INFO,
  POKEMON_TYPE_ARRAY,
  EffectMultiplier,
  EXCLUDED_TYPES,
  SpecialMove,
  SpecialAbility,
} from '@/constants/contents';

import addToMap from './addToMap';
import sortedMap from './sortedMap';

export default function calcAttackType(
  checkedType: PokemonTypeName[] | null,
  attackAbility: string | null,
  attackMove: string | null,
): calcResultType | null {
  const effectMap = new Map<number, PokemonTypeName[]>();

  const combinedDoubleEffect = new Set<PokemonTypeName>();
  const combinedHalfEffect = new Set<PokemonTypeName>();
  const combinedNormalEffect = new Set<PokemonTypeName>();

  checkedType?.forEach((checked) => {
    POKEMON_TYPE_INFO[checked].doubleEffect.forEach((type) =>
      combinedDoubleEffect.add(type),
    );
    POKEMON_TYPE_INFO[checked].normalEffect.forEach((type) =>
      combinedNormalEffect.add(type),
    );
    POKEMON_TYPE_INFO[checked].halfEffect.forEach((type) =>
      combinedHalfEffect.add(type),
    );
  });

  POKEMON_TYPE_ARRAY.forEach((type) => {
    if (EXCLUDED_TYPES.has(type)) return;

    if (combinedDoubleEffect.has(type)) {
      addToMap(effectMap, EffectMultiplier.DOUBLE, type);
      return;
    }
    if (combinedNormalEffect.has(type)) {
      addToMap(effectMap, EffectMultiplier.NORMAL, type);
      return;
    }

    if (combinedHalfEffect.has(type)) {
      if (attackAbility === SpecialAbility.GLASSES) {
        addToMap(effectMap, EffectMultiplier.NORMAL, type);
        return;
      }
      addToMap(effectMap, EffectMultiplier.HALF, type);
      return;
    }

    if (attackMove) {
      if (attackMove === SpecialMove.THOUSAND_ARROWS && type === 'flying') {
        addToMap(effectMap, EffectMultiplier.NORMAL, type);
        return;
      }
      if (attackMove === SpecialMove.FREEZE_DRY && type === 'water') {
        addToMap(effectMap, EffectMultiplier.DOUBLE, type);
        return;
      }
    }

    if (attackAbility) {
      if (attackAbility === SpecialAbility.PERSEVERANCE && type === 'ghost') {
        addToMap(effectMap, EffectMultiplier.NORMAL, type);
        return;
      }
    }
    addToMap(effectMap, EffectMultiplier.NONE, type);
  });

  return sortedMap(effectMap);
}
