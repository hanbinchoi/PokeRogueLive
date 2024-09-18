import '../../styles/globals.css';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';

import {
  PokemonDataProps,
  PokemonDetailProps,
  PokemonSpeciesProps,
} from '@/types/common';

import extractPokemonDetails from '@/utils/extractPokemonDetails';
import Link from 'next/link';
import usePokemonsStore from '@/stores/pokemonsStore';
import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';

export interface PokemonProps {
  id: number;
}

export const Pokemon = ({ id }: PokemonProps) => {
  if (id === null) return;

  const [pokemon, setPokemon] = useState<PokemonDataProps>();
  const { setTargetPokemon } = usePokemonsStore();

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
      <Link href={`/pokemon/${id}`} onClick={() => setTargetPokemon(pokemon)}>
        <PokemonImgBox pokemon={pokemon} usage="list" />
      </Link>
    );
};
