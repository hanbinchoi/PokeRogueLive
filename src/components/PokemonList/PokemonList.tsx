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
    <div className="bg-blue-10">
      {data?.map((pokemon) => <Pokemon name={pokemon.name} />)}
    </div>
  );
};
