import { calcResultType, PokemonTypeName } from '@/types/common';

import { POKEMON_TYPE_INFO, POKEMON_TYPE_ARRAY } from '@/constants/contents';

import addToMap from './addToMap';
import sortedMap from './sortedMap';

export default function calcAttackType(
  checkedType: PokemonTypeName[] | null,
  attackAbility: string | null,
  attackMove: string | null,
): calcResultType | null {
  if (!checkedType) return null;

  const effectMap = new Map<string, PokemonTypeName[]>();

  const combinedDoubleEffect = new Set<PokemonTypeName>();
  const combinedHalfEffect = new Set<PokemonTypeName>();
  const combinedNormalEffect = new Set<PokemonTypeName>();

  checkedType.forEach((checked) => {
    POKEMON_TYPE_INFO[checked].doubleEffect.forEach((type) =>
      combinedDoubleEffect.add(type),
    );
  });

  checkedType.forEach((checked) => {
    POKEMON_TYPE_INFO[checked].normalEffect.forEach((type) =>
      combinedNormalEffect.add(type),
    );
  });

  checkedType.forEach((checked) => {
    POKEMON_TYPE_INFO[checked].halfEffect.forEach((type) =>
      combinedHalfEffect.add(type),
    );
  });

  POKEMON_TYPE_ARRAY.forEach((type) => {
    if (type === 'stellar' || type === 'unknown') return;

    if (combinedDoubleEffect.has(type)) {
      addToMap(effectMap, '2', type);
      return;
    }
    if (combinedNormalEffect.has(type)) {
      addToMap(effectMap, '1', type);
      return;
    }

    if (combinedHalfEffect.has(type)) {
      if (attackAbility === '색안경') {
        addToMap(effectMap, '1', type);
        return;
      }
      addToMap(effectMap, '0.5', type);
      return;
    }

    if (attackMove) {
      if (attackMove === '사우전드 에로우' && type === 'flying') {
        addToMap(effectMap, '1', type);
        return;
      }
      if (attackMove === '프리즈 드라이' && type === 'water') {
        addToMap(effectMap, '2', type);
        return;
      }
    }

    if (attackAbility) {
      if (attackAbility === '배짱' && type === 'ghost') {
        addToMap(effectMap, '1', type);
        return;
      }
    }
    addToMap(effectMap, '0', type);
  });

  return sortedMap(effectMap);
}
