import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';
import { PokemonDataProps } from '@/types/common';
import extractPokemonDetails from '@/utils/extractPokemonDetails';
import { useEffect, useState } from 'react';
import { PokemonImgBox } from '../PokemonImgBox/PokemonImgBox';
import { PokemonStatBox } from '../PokemonStatBox/PokemonStatBox';

export interface PokemonPowerBoxProps {
  id: number | null;
}

export const PokemonPowerBox = ({ id }: PokemonPowerBoxProps) => {
  if (!id) return;

  const [targetPokemon, setTargetPokemon] = useState<PokemonDataProps>();

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
      setTargetPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  console.log(targetPokemon);

  if (!targetPokemon) return <div>포켓몬이 없어요.</div>;
  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

  return (
    <div className="flex gap-8">
      <PokemonImgBox pokemon={targetPokemon} id={id} usage="power" />
      <PokemonStatBox stats={targetPokemon.stats} />
    </div>
  );
};
