import { PokemonTypeName } from '@/types/common';

import { EffectMultiplier, POKEMON_TYPE_INFO } from '@/constants/contents';

export default function getAttackEffectMap(checkedType: PokemonTypeName[]) {
  const effectMap = new Map<EffectMultiplier, Set<PokemonTypeName>>([
    [EffectMultiplier.DOUBLE, new Set()],
    [EffectMultiplier.NORMAL, new Set()],
    [EffectMultiplier.HALF, new Set()],
  ]);

  checkedType.forEach((checked) => {
    POKEMON_TYPE_INFO[checked].doubleEffect.forEach((type) => {
      effectMap.get(EffectMultiplier.DOUBLE)!.add(type);
    });

    POKEMON_TYPE_INFO[checked].normalEffect.forEach((type) => {
      effectMap.get(EffectMultiplier.NORMAL)!.add(type);
    });

    POKEMON_TYPE_INFO[checked].halfEffect.forEach((type) => {
      effectMap.get(EffectMultiplier.HALF)!.add(type);
    });
  });

  const resultMap = new Map<EffectMultiplier, PokemonTypeName[]>(
    Array.from(effectMap.entries()).map(([key, value]) => [
      key,
      Array.from(value),
    ]),
  );

  return resultMap;
}
