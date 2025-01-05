import { PokemonType } from '@/types/common';

/**
 * 주어진 맵을 내림차순으로 정렬하여 반환하는 함수.
 *
 * @param map - 숫자 키와 포켓몬 타입 배열을 값으로 가지는 맵 (`Map<number, PokemonType[]>`)
 * @returns 내림차순으로 정렬된 새로운 맵
 */
export default function sortedMap(
  map: Map<number, PokemonType[]>,
): Map<number, PokemonType[]> {
  const entries = Array.from(map.entries());

  // 배열을 키 값을 기준으로 내림차순으로 정렬
  const sortedEntries = entries.sort(([keyA], [keyB]) => keyB - keyA);

  return new Map(sortedEntries);
}
