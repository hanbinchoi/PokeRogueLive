import '../../styles/globals.css';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';

import { TypeBadge } from '../TypeBadge/TypeBadge';

import {
  PokemonDataProps,
  PokemonDetailProps,
  PokemonSpeciesProps,
} from '@/types/common';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface PokemonCardProps {
  id: number;
}

export const PokemonCard = ({ id }: PokemonCardProps) => {
  if (id === null) return;

  const [pokemon, setPokemon] = useState<PokemonDataProps>();

  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
  } = useQuery<PokemonDetailProps>({
    queryKey: ['detail', id],
    queryFn: () => getPokemon(id),
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

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

  if (pokemon)
    return (
      <div className="px-8 py-4 text-sm font-bold flex flex-col items-center bg-white-100 border-2 rounded-lg">
        <div>{`No. ${String(pokemon.pokedex).padStart(3, '0')}`}</div>
        <img className="w-24" alt={pokemon.name} src={pokemon.imageUrl} />
        <div className="mb-2 text-lg">{pokemon.name}</div>
        <div className="flex gap-2">
          {pokemon.type.map((t, i) => (
            <TypeBadge key={t + i} type={t} size="small" />
          ))}
        </div>
      </div>
    );
};
