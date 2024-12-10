import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';
import { PokemonDataProps, PokemonDetailProps } from '@/types/common';
import extractPokemonDetails from '@/utils/extractPokemonDetails';
import { useEffect, useState } from 'react';
import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';
import { PokemonStatBox } from '../PokemonStatBox/PokemonStatBox';

export interface PokemonPowerBoxProps {
  id: number | null;
  pokemon: PokemonDataProps | null;
  setPokemon: (pokemon: PokemonDataProps | null) => void;
}

export const PokemonPowerBox = ({
  id,
  pokemon,
  setPokemon,
}: PokemonPowerBoxProps) => {
  if (!id) return;

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

  if (!pokemon) return <div>포켓몬이 없어요.</div>;
  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

  return (
    <div className="flex gap-8">
      <PokemonImgBox pokemon={pokemon} id={id} usage="power" />
      <PokemonStatBox stats={pokemon.stats} />
    </div>
  );
};
