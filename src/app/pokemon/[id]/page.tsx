'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import usePokemonsStore from '@/stores/pokemonsStore';

import { EvolutionChain } from '@/components/EvolutionChain/EvolutionChain';
import { PokemonBasicInfo } from '@/components/PokemonBasicInfo/PokemonBasicInfo';
import { PokemonImgBox } from '@/components/PokemonImgBox/PokemonImgBox';
import { AbilityBox } from '@/components/AbilityBox/AbilityBox';
import { MoveBox } from '@/components/MoveBox/MoveBox';
import { PokemonStatInfo } from '@/components/PokemonStatInfo/PokemonStatInfo';
import { PokemonStatInfoTable } from '@/components/PokemonStatInfoTable/PokemonStatInfoTable';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

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

  useEffect(() => {
    if (pokemonData && speciesData)
      setTargetPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  if (!targetPokemon) return <div>포켓몬이 없어요.</div>;
  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

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
