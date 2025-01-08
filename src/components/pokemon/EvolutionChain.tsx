import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPokemonEvolutionChain } from '@/api/pokemon';

import { ErrorComponent, LoadingComponent } from '../common';
import { EvolutionNode } from './EvolutionNode';

import extractNodes from '@/utils/extractNodes';

import { EvolutionChainNodeDataProps } from '@/types/data';

export interface EvolutionChainProps {
  url: string;
  pokedex: number;
}

/**
 * 포켓몬 진화 정보를 표시하는 컴포넌트.
 *
 * - 포켓몬의 진화 정보는 chain이라는 형태로 저장되며 chain은 진화 상세 설명(`evolution_details`), 진화 정보(`evolves_to`)등을 포함합니다.
 * - 다음 진화 정보 역시 chain 형태를 저장하고 있으며 위와 같은 형태입니다. 즉 재귀적으로 표현 가능합니다. `evolves_to -> evolves_to -> ...more`
 * - `EvolutionChain` 컴포넌트에서는 진화 정보를 재귀적으로 탐색하며 탐색한 진화 정보를 추출하여 노드로 활용합니다.
 *
 * @param url API URL로, 첫번째 진화 체인 데이터를 가져오는데 사용됩니다. 여기서 가져온 데이터의 진화 정보는 root가 됩니다. (`string`)
 * @param pokedex 포켓몬 도감 번호로, `react-query`의 캐싱 키로 사용됩니다. (`number`)
 */
export const EvolutionChain = ({ url, pokedex }: EvolutionChainProps) => {
  const [evolutionNodes, setEvolutionNodes] =
    useState<EvolutionChainNodeDataProps[]>();
  console.log(url);
  const {
    data: evolutionChain,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['evolution-chain', pokedex],
    queryFn: () => getPokemonEvolutionChain(url),
    enabled: !!url,
  });

  // 진화 체인 데이터를 `extractNodes`를 통해 진화 정보만 배열 형태로 추출하여 상태로 저장
  useEffect(
    () => evolutionChain && setEvolutionNodes(extractNodes(evolutionChain)),
    [evolutionChain],
  );

  return (
    <div className="flex flex-col items-center">
      <p className="text-lg min-[480px]:text-xl font-bold w-full">진화 정보</p>
      {isLoading && (
        <div className="mt-12">
          <LoadingComponent />
        </div>
      )}
      {isError && (
        <div className="mt-12">
          <ErrorComponent
            size="small"
            message="진화 정보를 찾을 수 없습니다."
          />
        </div>
      )}
      {evolutionNodes?.map((node, i) => (
        <EvolutionNode
          key={`${node.species.name}-${i}`}
          node={node}
          isLast={i === evolutionNodes.length - 1}
        />
      ))}
    </div>
  );
};
