'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { ErrorComponent, LoadingComponent, TypeBadge } from '../common';

import { PokemonDetailProps } from '@/types/common';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface PokemonProps {
  id: number;
}

export const Pokemon = ({ id }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetailProps | null>(null);

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  const isLoading = isLoadingPokemon || isLoadingSpecies;
  const isError = isErrorPokemon || isErrorSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails(pokemonData, speciesData));
  }, [pokemonData, speciesData]);

  return (
    <Link href={`/pokemon/${id}`} className="w-full h-full flex justify-center">
      <div className="w-[150px] min-w-[150px] lg:min-w-[170px] h-[202px] min-h-[202px] lg:min-h-[212px] px-6 xl:px-8 py-4 text-sm font-bold flex flex-col justify-center items-center bg-white-100 border-2 rounded-lg">
        {isLoading && <LoadingComponent />}
        {isError && <ErrorComponent message="Not Found" size="xsmall" />}
        <div>{`No. ${String(id).padStart(3, '0')}`}</div>
        <img className="w-24" alt={pokemon?.name} src={pokemon?.imageUrl} />
        <div className="mb-2 text-lg">{pokemon?.name}</div>
        <div className="flex gap-2">
          {pokemon?.type.map((t, i) => (
            <TypeBadge key={`${t}-${i}`} type={t} size="small" />
          ))}
        </div>
      </div>
    </Link>
  );
};
