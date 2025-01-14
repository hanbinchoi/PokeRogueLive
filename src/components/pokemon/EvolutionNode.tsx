import Link from 'next/link';
import { useEffect, useState } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { FaArrowDown } from '@react-icons/all-files/fa/FaArrowDown';
import { ErrorComponent, LoadingComponent } from '../common';
import { EvolutionDescription } from './EvolutionDescription';

import { PokemonDetailProps } from '@/types/common';
import { EvolutionChainNodeDataProps } from '@/types/data';

import extractIdFromUrl from '@/utils/extractIdFromUrl';
import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface EvolutionNodeProps {
  node: EvolutionChainNodeDataProps;
  isFirst: boolean;
}

/**
 * 진화 체인의 개별 노드를 표시하는 컴포넌트.
 *
 * - `EvolutionChain에서` 추출한 노드를 그리기 위한 컴포넌트 입니다.
 * - 포켓몬의 이미지, 이름, 진화 조건 등을 표시합니다.
 * - 진화 단계가 마지막인지 여부에 따라 아래 화살표를 렌더링합니다.
 *
 * @param node 현재 노드 데이터 (`EvolutionChainNodeDataProps`)
 * @param isFirst 해당 노드가 첫번째 진화 경로인지 여부 (`boolean`)
 */
export const EvolutionNode = ({ node, isFirst }: EvolutionNodeProps) => {
  const id = extractIdFromUrl(node.species.url);
  const [pokemon, setPokemon] = useState<PokemonDetailProps>();

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(id); // 포켓몬 상세정보 fetching. 포켓몬 이미지를 가져오기 위해 사용됩니다.

  const isLoading = isLoadingPokemon || isLoadingSpecies;
  const isError = isErrorPokemon || isErrorSpecies;

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails(pokemonData, speciesData));
  }, [pokemonData, speciesData]);

  if (isLoading)
    return (
      <div className="m-3">
        <LoadingComponent />
      </div>
    );

  if (isError)
    return (
      <div className="mt-2">
        <ErrorComponent message="진화 정보가 없어요." size="small" />
      </div>
    );

  return (
    <div className="evolution-node flex flex-col items-center w-full">
      <div className="relative text-xs min-[480px]:text-sm text-right font-semibold w-full ">
        <div className="flex flex-col items-center mb-4">
          {!isFirst && (
            <FaArrowDown className="w-4 h-4 min-[480px]:w-6 min-[480px]:h-6" />
          )}
        </div>

        {node.evolution_details.map((e, i) => (
          <div
            className="absolute top-0 left-[65%] whitespace-nowrap flex gap-1"
            key={i}>
            <EvolutionDescription evolutionDetails={e} />
          </div>
        ))}
      </div>
      <Link href={`/pokemon/${id}`}>
        <img className="w-32 " alt={pokemon?.name} src={pokemon?.imageUrl} />
      </Link>
    </div>
  );
};
