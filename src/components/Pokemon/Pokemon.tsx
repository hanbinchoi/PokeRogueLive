import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PokemonDataProps } from '@/types/common';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface PokemonProps {
  id: number;
}

export const Pokemon = ({ id }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDataProps | null>(null);

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  const isLoading = isLoadingPokemon || isLoadingSpecies;
  const isError = isErrorPokemon || isErrorSpecies;

  return (
    <Link href={`/pokemon/${id}`} className="w-full h-full flex justify-center">
      <PokemonImgBox
        pokemon={pokemon}
        usage="list"
        id={id}
        isError={!pokemon || isError}
        isLoading={isLoading}
      />
    </Link>
  );
};
