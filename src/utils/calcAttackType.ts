import { POKEMON_TYPE, POKEMON_TYPE_ARRAY } from '@/constants/contents';
import { PokemonType } from '@/types/common';
import addToMap from './addToMap';
import sortedMap from './sortedMap';

export default function calcAttackType(
  checkedType: PokemonType[] | null,
  attackAbility: string | null,
  attackMove: string | null,
): Map<string, PokemonType[]> | null {
  if (!checkedType) return null;

  const effectMap = new Map<string, PokemonType[]>();

  const combinedDoubleEffect = new Set<PokemonType>();
  const combinedHalfEffect = new Set<PokemonType>();
  const combinedNormalEffect = new Set<PokemonType>();

  checkedType.forEach((checked) => {
    POKEMON_TYPE[checked].doubleEffect.forEach((type) =>
      combinedDoubleEffect.add(type as PokemonType),
    );
  });

  checkedType.forEach((checked) => {
    POKEMON_TYPE[checked].normalEffect.forEach((type) =>
      combinedNormalEffect.add(type as PokemonType),
    );
  });

  checkedType.forEach((checked) => {
    POKEMON_TYPE[checked].halfEffect.forEach((type) =>
      combinedHalfEffect.add(type as PokemonType),
    );
  });

  console.log(combinedDoubleEffect, combinedHalfEffect, combinedNormalEffect);
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
