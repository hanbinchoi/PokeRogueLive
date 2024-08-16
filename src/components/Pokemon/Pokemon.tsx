import '../../styles/globals.css';

import { useQueries, UseQueryResult } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';
import { TypeBadge } from '../TypeBadge/TypeBadge';
import extractPokemonDetails from '@/utils/extractPokemonDetails';
import {
  PokemonDataProps,
  PokemonDetailprops,
  PokemonSpeciesProps,
} from '@/types/common';
import { useEffect, useState } from 'react';

export interface PokemonProps {
  name: string;
}

export const Pokemon = ({ name }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDataProps>();
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

  const [pokemonResult, speciesResult] = results as [
    UseQueryResult<PokemonDetailprops, Error>,
    UseQueryResult<PokemonSpeciesProps, Error>,
  ];

  useEffect(() => {
    if (pokemonResult.data && speciesResult.data)
      setPokemon(
        extractPokemonDetails([pokemonResult.data, speciesResult.data]),
      );
  }, [pokemonResult.data, speciesResult.data]);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error</div>;

  if (pokemon)
    return (
      <div className="px-8 py-4 text-sm font-bold flex flex-col items-center bg-white-100 border-2 rounded-lg">
        <div>{`No. ${String(pokemon.pokedex).padStart(3, '0')}`}</div>
        <img className="w-24" alt={name} src={pokemon.imageUrl} />
        <div className="mb-3">{pokemon.name}</div>
        <div className="flex gap-2">
          {pokemon.type.map((t, i) => (
            <TypeBadge key={t + i} type={t} size="small" />
          ))}
        </div>
      </div>
    );
};
