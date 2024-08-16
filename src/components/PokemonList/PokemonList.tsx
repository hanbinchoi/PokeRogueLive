'use client';

import { useQuery } from '@tanstack/react-query';
import '../../styles/globals.css';

import { getPokemons } from '@/api/pokemon';

import { Pokemon } from '../Pokemon/Pokemon';

import { PokemonsResponseProps } from '@/types/common';
import { useEffect } from 'react';
import usePokemonsStore from '@/stores/pokemonsStore';
import { PagingDocuments } from '../PagingDocuments/PagingDocuments';

export const PokemonList = ({}) => {
  const setTotal = usePokemonsStore((state) => state.setTotal);
  const now = usePokemonsStore((state) => state.now);

  const { isLoading, error, data } = useQuery<PokemonsResponseProps>({
    queryKey: ['pokemons', now],
    queryFn: () => getPokemons(now),
  });
  console.log(data);
  useEffect(() => {
    if (data) setTotal(data?.count);
  }, [data]);

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  if (data)
    return (
      <>
        <div className="grid grid-cols-5 py-2 px-14 gap-8">
          {data.data.map((pokemon) => (
            <Pokemon key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
        <PagingDocuments />
      </>
    );
};
