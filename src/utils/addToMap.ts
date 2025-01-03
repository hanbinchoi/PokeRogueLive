import { PokemonTypeName } from '@/types/common';

/**
 * 맵 객체에 값을 추가하는 함수입니다. 타입 별 데미지 계산 시 피해의 크기별로 타입을 배열로 보관합니다
 *
 * 맵에 이미 key가 존재하면, 해당 키 배열에 값 추가합니다.
 *
 * 맵에 key가 존재하지 않으면, 해당 키에 새로운 배열을 추가합니다.
 * @param map - 값을 저장할 Map 객체 (`Map<number, PokemonTypeName[]>`)
 * @param key - Map의 key값 (`number`)
 * @param value - key의 저장 할 값 (`PokemonTypeName`)
 */
export default function addToMap(
  map: Map<number, PokemonTypeName[]>,
  key: number,
  value: PokemonTypeName,
): void {
  if (map.has(key)) {
    map.get(key)!.push(value);
  } else {
    map.set(key, [value]);
  }
}
