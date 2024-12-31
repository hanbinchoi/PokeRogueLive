import { useEffect } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';
import { PokemonStatBox } from '../PokemonStatBox/PokemonStatBox';

import extractPokemonDetails from '@/utils/extractPokemonDetails';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';

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
  const isError = isErrorPokemon || isErrorSpecies || !pokemon;

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);
  if (isLoading)
    return (
      <div className="h-[202px] min-h-[202px] lg:min-h-[212px]">
        <LoadingComponent />
      </div>
    );
  if (isError)
    return (
      <div className="h-[202px] min-h-[202px] lg:min-h-[212px]">
        <ErrorComponent size="small" message="포켓몬을 찾을 수 없어요." />
      </div>
    );

  if (pokemon)
    return (
      <div className="flex flex-col items-center lg:flex-row gap-6 mb-4">
        <PokemonImgBox pokemon={pokemon} id={id} usage="power" />
        <PokemonStatBox stats={pokemon.stats} usage={usage} pokemon={pokemon} />
      </div>
    );
};
