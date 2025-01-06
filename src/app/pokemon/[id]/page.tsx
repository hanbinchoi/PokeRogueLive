'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import usePokemonsStore from '@/stores/pokemonsStore';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import {
  ErrorComponent,
  LoadingComponent,
  PokemonImgBox,
} from '@/components/common';
import {
  AbilityBox,
  EvolutionChain,
  MoveBox,
  PokemonBasicInfo,
  PokemonStatInfo,
  PokemonStatInfoTable,
} from '@/components/pokemon';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export default function PokemonDetail() {
  const { id } = useParams();

  const { setTargetPokemon, targetPokemon } = usePokemonsStore();

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  const isError = isErrorPokemon || isErrorSpecies || !targetPokemon;
  const isLoading = isLoadingPokemon || isLoadingSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      setTargetPokemon(extractPokemonDetails(pokemonData, speciesData));
  }, [pokemonData, speciesData]);

  if (isLoading)
    return (
      <div className="w-full h-full">
        <LoadingComponent />
      </div>
    );
  if (isError)
    return (
      <div className="w-full h-full">
        <ErrorComponent message="포켓몬을 찾을 수 없어요" />
      </div>
    );

  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-between p-8 md:p-12 lg:p-16 xl:p-24">
      <h1 id="pokemon-detail" className="sr-only">
        {targetPokemon.name} 상세정보
      </h1>
      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-8 sm:gap-16 ">
        <div className="col-span-1 ">
          <PokemonImgBox pokemon={targetPokemon} usage="detail" id={+id} />
        </div>
        <div className="col-span-1 min-[480px]:col-span-2 flex flex-col justify-center gap-6">
          <PokemonBasicInfo pokemon={targetPokemon} />
          <PokemonStatInfo pokemon={targetPokemon} className="hidden md:flex" />
        </div>
        <div className="col-span-3 block md:hidden">
          <PokemonStatInfoTable pokemon={targetPokemon} />
        </div>
        <div className="col-span-1">
          <EvolutionChain
            url={targetPokemon.evolution_chain}
            pokedex={targetPokemon.pokedex}
          />
        </div>
        <div className="col-span-1 min-[480px]:col-span-2">
          <AbilityBox abilities={targetPokemon.abilitiesInfo} />
          <MoveBox moves={targetPokemon.moves} />
        </div>
      </div>
    </main>
  );
}
