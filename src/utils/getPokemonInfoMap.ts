import { PokemonDetailProps, PokemonInfoProps } from '@/types/common';

/**
 * 포켓몬의 상세 정보를 기반으로 기본 정보를 매핑하여 반환하는 함수
 *
 * @param pokemon - 포켓몬의 상세 정보를 담은 객체 (`PokemonDetailProps`)
 *
 * @returns 포켓몬의 기본 정보를 담은 객체 (`PokemonInfoProps`)
 */
export default function getPokemonInfoMap(
  pokemon: PokemonDetailProps,
): PokemonInfoProps {
  return {
    genera: pokemon.genera,
    height: pokemon.height / 10,
    weight: pokemon.weight / 10,
    base_experience: pokemon.base_experience,
    capture_rate: pokemon.capture_rate,
  };
}
