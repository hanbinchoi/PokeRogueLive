import { PokemonType } from '@/types/common';

export default function addToMap(
  map: Map<string, PokemonType[]>,
  key: string,
  value: PokemonType,
): void {
  if (map.has(key)) {
    // 키가 이미 존재하는 경우, 해당 키의 배열에 값을 추가
    map.get(key)!.push(value);
  } else {
    // 키가 존재하지 않는 경우, 새 키를 추가하고 값을 배열로 넣음
    map.set(key, [value]);
  }
}
