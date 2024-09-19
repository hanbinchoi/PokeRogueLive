'use client';
import { useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';

import { PokemonDetailProps, PokemonSpeciesProps } from '@/types/common';

export default function usePokemonDetailQuery(id: string) {
  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
  } = useQuery<PokemonDetailProps>({
    queryKey: ['detail', id],
    queryFn: () => getPokemon(+id),
  });

  const {
    data: speciesData,
    isLoading: isLoadingSpecies,
    isError: isErrorSpecies,
  } = useQuery<PokemonSpeciesProps>({
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
