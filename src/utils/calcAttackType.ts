import { POKEMON_TYPE, POKEMON_TYPE_ARRAY } from '@/constants/contents';
import { PokemonType } from '@/types/common';
import addToMap from './addToMap';
import sortedMap from './sortedMap';

export default function calcAttackType(
  checkedType: PokemonType[] | null,
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
      addToMap(effectMap, '0.5', type);
      return;
    }

    addToMap(effectMap, '0', type);
  });

  return sortedMap(effectMap);
}
