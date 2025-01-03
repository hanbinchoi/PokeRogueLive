import { PokemonTypeName } from '@/types/common';

import {
  EffectMultiplier,
  SpecialMove,
  SpecialAbility,
} from '@/constants/contents';

export default function calcEffectMultiplier(
  type: PokemonTypeName,
  attackEffectMap: Map<EffectMultiplier, PokemonTypeName[]>,
  attackAbility: string | null,
  attackMove: string | null,
): EffectMultiplier {
  const doubleEffect = attackEffectMap.get(EffectMultiplier.DOUBLE);
  if (doubleEffect && doubleEffect.includes(type)) {
    return EffectMultiplier.DOUBLE;
  }

  const normalEffect = attackEffectMap.get(EffectMultiplier.NORMAL);
  if (normalEffect && normalEffect.includes(type)) {
    return EffectMultiplier.NORMAL;
  }

  const halfEffect = attackEffectMap.get(EffectMultiplier.HALF);
  if (halfEffect && halfEffect.includes(type)) {
    return attackAbility === SpecialAbility.GLASSES
      ? EffectMultiplier.NORMAL
      : EffectMultiplier.HALF;
  }

  if (attackMove === SpecialMove.THOUSAND_ARROWS && type === 'flying') {
    return EffectMultiplier.NORMAL;
  }

  if (attackMove === SpecialMove.FREEZE_DRY && type === 'water') {
    return EffectMultiplier.DOUBLE;
  }

  if (attackAbility === SpecialAbility.PERSEVERANCE && type === 'ghost') {
    return EffectMultiplier.NORMAL;
  }

  return EffectMultiplier.NONE;
}
