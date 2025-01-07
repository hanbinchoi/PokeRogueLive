'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { ErrorComponent, LoadingComponent, TypeBadge } from '../common';

import { PokemonDetailProps } from '@/types/common';

import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface PokemonProps {
  id: number;
}

/**
 * 포켓몬 목록에 보여 줄 포켓몬 디자인 component
 *
 * props로 넘겨받은 id를 통해 데이터를 요청합니다. 요청 시 발생하는 로딩이나 에러에 대응할 수 있습니다.
 *
 * - id: 요청을 보내기 위한 포켓몬 id (`number`)
 */
export const PokemonCard = ({ id }: PokemonProps) => {
  const [pokemon, setPokemon] = useState<PokemonDetailProps | null>(null);

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  const isLoading = isLoadingPokemon || isLoadingSpecies;
  const isError = isErrorPokemon || isErrorSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails(pokemonData, speciesData));
  }, [pokemonData, speciesData]);

  return (
    <Link href={`/pokemon/${id}`} className="w-full h-full flex justify-center">
      <div className="w-[150px] min-w-[150px] lg:min-w-[170px] h-[202px] min-h-[202px] lg:min-h-[212px] px-6 xl:px-8 py-4 text-sm font-bold flex flex-col justify-center items-center bg-white-100 border-2 rounded-lg">
        {isLoading && <LoadingComponent />}
        {isError && <ErrorComponent message="Not Found" size="xsmall" />}
        <div>{`No. ${String(id).padStart(3, '0')}`}</div>
        <img className="w-24" alt={pokemon?.name} src={pokemon?.imageUrl} />
        <div className="mb-2 text-lg">{pokemon?.name}</div>
        <div className="flex gap-2">
          {pokemon?.type.map((t, i) => (
            <TypeBadge key={`${t}-${i}`} type={t} size="small" />
          ))}
        </div>
      </div>
    </Link>
  );
};
