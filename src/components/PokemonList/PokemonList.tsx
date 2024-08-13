'use client';

import { useQuery } from '@tanstack/react-query';
import '../../styles/globals.css';
import { getPokemon, getPokemons } from '@/api/pokemon';
import { Pokemon } from '../Pokemon/Pokemon';

export const PokemonList = ({}) => {
  const { isLoading, error, data } = useQuery<any[]>({
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
