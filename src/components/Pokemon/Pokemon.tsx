import Link from 'next/link';
import { useEffect, useState } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';

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

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails(pokemonData, speciesData));
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
