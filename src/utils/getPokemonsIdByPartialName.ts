import { POKEMON_LIST_IN_KOREAN } from '@/constants/contents';

export default function getPokemonsByPartialName(input: string): number[] {
  console.log(input);
  return POKEMON_LIST_IN_KOREAN.map((word, index) =>
    word.includes(input) ? index + 1 : -1,
  ).filter((index) => index !== -1);
}
