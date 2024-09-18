'use client';
import { getPokemon, getPokemonSpecies } from '@/api/pokemon';
import { PokemonBasicInfo } from '@/components/PokemonBasicInfo/PokemonBasicInfo';
import { PokemonImgBox } from '@/components/PokemonImgBox/PokemonImgBox';
import usePokemonsStore from '@/stores/pokemonsStore';
import {
  PokemonDataProps,
  PokemonDetailProps,
  PokemonSpeciesProps,
} from '@/types/common';
import extractPokemonDetails from '@/utils/extractPokemonDetails';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PokemonDetail() {
  const { id } = useParams();
  if (id === null) return;

  const { setTargetPokemon, targetPokemon } = usePokemonsStore();

  const {
    data: pokemonData,
    isLoading: isLoadingPokemon,
    isError: isErrorPokemon,
  } = useQuery<PokemonDetailProps>({
    queryKey: ['detail', id],
    queryFn: () => getPokemon(+id),
    enabled: !targetPokemon,
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
      setTargetPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

  if (!targetPokemon) return <div>포켓몬이 없어요.</div>;

  if (targetPokemon)
    return (
      <main className="bg-gray-10 w-full flex min-h-screen flex-col items-center justify-between p-24">
        <div className="w-full grid grid-cols-3 gap-16">
          <div className="col-span-1">
            <PokemonImgBox pokemon={targetPokemon} usage="detail" />
          </div>
          <div className="col-span-2 ">
            <PokemonBasicInfo pokemon={targetPokemon} />
          </div>
        </div>
      </main>
    );
}
