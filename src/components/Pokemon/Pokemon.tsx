import '../../styles/globals.css';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { PokemonDataProps } from '@/types/common';

import usePokemonsStore from '@/stores/pokemonsStore';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface PokemonProps {
  id: number;
}

export const Pokemon = ({ id }: PokemonProps) => {
  if (id === null) return;

  const [pokemon, setPokemon] = useState<PokemonDataProps>();
  const { setTargetPokemon } = usePokemonsStore();

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

  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

  if (pokemon)
    return (
      <Link href={`/pokemon/${id}`}>
        <PokemonImgBox pokemon={pokemon} usage="list" id={id} />
      </Link>
    );
};
