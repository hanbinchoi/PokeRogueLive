import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

/**
 * 입력된 문자열이 이름에 포함되는 포켓몬의 ID 목록을 반환하는 함수.
 *
 * @param input - 입력 문자열 (`string`)
 * @return 해당하는 포켓몬 Id 목록 (`number[]`)
 */
export default function getPokemonsByPartialName(input: string): number[] {
  return POKEMON_LIST_IN_KOREAN.map((word, index) =>
    word.includes(input) ? index + 1 : -1,
  ).filter((index) => index !== -1);
}
