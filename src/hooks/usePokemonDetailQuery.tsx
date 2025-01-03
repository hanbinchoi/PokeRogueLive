import { useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';

import { PokemonDetailDataProps, PokemonSpeciesDataProps } from '@/types/data';

/**
 * 포켓몬 ID를 기반으로 포켓몬의 세부 정보와 종(species) 데이터를 가져오는 React Query 훅
 *
 * 주요 기능:
 * - 포켓몬의 상세 데이터(`pokemonData`)와 종 데이터(`speciesData`)를 Fetch합니다.
 * - 데이터를 가져오는 동안 로딩 상태(`isLoadingPokemon`, `isLoadingSpecies`)와 에러 상태(`isErrorPokemon`, `isErrorSpecies`)를 제공합니다.
 * - 첫 번째 요청(포켓몬 데이터)이 성공적으로 완료된 후 두 번째 요청(종 데이터)이 실행됩니다.
 *
 * ```tsx
 * const {
 *   pokemonData,
 *   speciesData,
 *   isLoadingPokemon,
 *   isLoadingSpecies,
 *   isErrorPokemon,
 *   isErrorSpecies,
 * } = usePokemonDetailQuery(pokemonId);
 * ```
 * @param id - 포켓몬 ID
 * @returns - 포켓몬 데이터 요청과 종 데이터 요청의 대한 데이터, 로딩, 에러를 한번에 반환합니다.
 */
export default function usePokemonDetailQuery(id: string) {
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
  } = useQuery<PokemonDetailDataProps>({
    queryKey: ['detail', id],
    queryFn: () => getPokemon(+id),
  });

  const {
    data: speciesData,
    isLoading: isLoadingSpecies,
    isError: isErrorSpecies,
  } = useQuery<PokemonSpeciesDataProps>({
    queryKey: ['species', pokemonData?.id],
    queryFn: () => getPokemonSpecies(pokemonData!.species.url),
    enabled: !!pokemonData,
  });

  return {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  };
}
