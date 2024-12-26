import { useEffect } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';
import { PokemonStatBox } from '../PokemonStatBox/PokemonStatBox';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface PokemonPowerBoxProps {
  id: number;
  usage: 'attack' | 'defend';
}

export const PokemonPowerBox = ({ id, usage }: PokemonPowerBoxProps) => {
  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  const pokemon =
    usage === 'attack'
      ? usePowerCalculatorStore((state) => state.attackPokemon)
      : usePowerCalculatorStore((state) => state.defendPokemon);
  const setPokemon =
    usage === 'attack'
      ? usePowerCalculatorStore((state) => state.setAttackPokemon)
      : usePowerCalculatorStore((state) => state.setDefendPokemon);

  const isLoading = isLoadingPokemon || isLoadingSpecies;
  const isError = isErrorPokemon || isErrorSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  if (!pokemon) return <div>포켓몬이 없어요.</div>;
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading Pokemon data.</div>;

  return (
    <div className="flex gap-8">
      <PokemonImgBox pokemon={pokemon} id={id} usage="power" />
      <PokemonStatBox stats={pokemon.stats} usage={usage} pokemon={pokemon} />
    </div>
  );
};
