'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import usePokemonsStore from '@/stores/pokemonsStore';

import { EvolutionChain } from '@/components/EvolutionChain/EvolutionChain';
import { PokemonBasicInfo } from '@/components/PokemonBasicInfo/PokemonBasicInfo';
import { PokemonImgBox } from '@/components/PokemonImgBox/PokemonImgBox';
import { AbilityBox } from '@/components/AbilityBox/AbilityBox';
import { MoveBox } from '@/components/MoveBox/MoveBox';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import extractPokemonDetails from '@/utils/extractPokemonDetails';
import extractMoveList from '@/utils/extractMoveList';

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

  if (targetPokemon)
    return (
      <main className="bg-gray-10  flex min-h-screen flex-col items-center justify-between p-24">
        <div className="grid grid-cols-3 gap-16">
          <div className="col-span-1">
            <PokemonImgBox pokemon={targetPokemon} usage="detail" id={+id} />
          </div>
          <div className="col-span-2">
            <PokemonBasicInfo pokemon={targetPokemon} />
          </div>
          <div className="col-span-1">
            <EvolutionChain
              url={targetPokemon.evolution_chain}
              pokedex={targetPokemon.pokedex}
            />
          </div>
          <div className="col-span-2 flex flex-col gap-8">
            <AbilityBox abilities={targetPokemon.abilitiesInfo} />
            <MoveBox moves={extractMoveList(targetPokemon.moves)} />
          </div>
        </div>
      </main>
    );
}
