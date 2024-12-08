'use client';
import { useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonMove, getPokemonSpecies } from '@/api/pokemon';

import {
  MoveDetailProps,
  PokemonDetailProps,
  PokemonSpeciesProps,
} from '@/types/common';

export default function usePokemonMoveQuery(url: string) {
  const { data, isLoading, isError } = useQuery<MoveDetailProps>({
    queryKey: ['detail', url],
    queryFn: () => getPokemonMove(url),
  });

  return {
    data,
    isLoading,
    isError,
  };
}
