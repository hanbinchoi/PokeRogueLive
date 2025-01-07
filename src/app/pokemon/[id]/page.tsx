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

/**
 * 포켓몬 상세정보 페이지
 *
 * 포켓몬 목록 페이지로부터 url에 id를 전달받아 해당 id를 통해 데이터를 요청.
 *
 * 포켓몬의 상세 정보(스탯, 진화, 기술 등)를 나열합니다.
 */
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
  } = usePokemonDetailQuery(String(id)); // 포켓몬 상세 정보 구성을 위해 2개의 요청을 보내야함.

  // 2개의 요청으로부터 error, loading 상태 확인
  const isError = isErrorPokemon || isErrorSpecies || !targetPokemon;
  const isLoading = isLoadingPokemon || isLoadingSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      setTargetPokemon(extractPokemonDetails(pokemonData, speciesData)); // 받아온 2개의 데이터를 이용해 필요한 데이터로 구성
  }, [pokemonData, speciesData]);

  if (isLoading)
    return (
      <div className="w-full h-full">
        <LoadingComponent />
      </div>
    );
  if (isError || !targetPokemon)
    return (
      <div className="w-full h-full">
        <ErrorComponent message="포켓몬을 찾을 수 없어요" />
      </div>
    );

  return (
    <main className="bg-gray-10 flex min-h-screen flex-col items-center justify-between p-8 md:p-12 lg:p-16 xl:p-24">
      <h1 className="sr-only">{targetPokemon.name} 상세정보</h1>
      <div className="grid grid-cols-2 min-[480px]:grid-cols-3 gap-8 sm:gap-16 ">
        <div className="col-span-1 ">
          <PokemonImgBox pokemon={targetPokemon} usage="detail" />
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
