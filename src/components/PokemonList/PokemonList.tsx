'use client';

import { useQuery } from '@tanstack/react-query';
import '../../styles/globals.css';

import { getPokemons } from '@/api/pokemon';

import { Pokemon } from '../Pokemon/Pokemon';

import { DataProps } from '@/types/common';

export const PokemonList = ({}) => {
  const { isLoading, error, data } = useQuery<DataProps[]>({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
  });
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return (
    <div className="flex flex-wrap py-2 px-14 gap-8">
      {data?.map((pokemon) => (
        <Pokemon key={pokemon.name} name={pokemon.name} />
      ))}
    </div>
  );
};
