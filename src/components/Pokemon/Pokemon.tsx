import '../../styles/globals.css';

import { useQueries } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';

export interface PokemonProps {
  name: string;
}

export const Pokemon = ({ name }: PokemonProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['detail', name],
        queryFn: () => getPokemon(name),
      },
      {
        queryKey: ['species', name],
        queryFn: () => getPokemonSpecies(name),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error</div>;
  return <div></div>;
};
