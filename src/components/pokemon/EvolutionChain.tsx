import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { getPokemonEvolutionChain } from '@/api/pokemon';

import { EvolutionNode } from '../EvolutionNode/EvolutionNode';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { ErrorComponent } from '../ErrorComponent';

import extractNodes from '@/utils/extractNodes';

import { EvolutionChainNodeProps } from '@/types/common';

export interface EvolutionChainProps {
  url: string;
  pokedex: number;
}

export const EvolutionChain = ({ url, pokedex }: EvolutionChainProps) => {
  const [evolutionNodes, setEvolutionNodes] =
    useState<EvolutionChainNodeProps[]>();

  const {
    data: evolutionChain,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['evolution-chain', pokedex],
    queryFn: () => getPokemonEvolutionChain(url),
    enabled: !!url,
  });

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
      {evolutionNodes &&
        evolutionNodes.map((node, i) => (
          <EvolutionNode
            key={`${node.species.name}-${i}`}
            node={node}
            isLast={i === evolutionNodes.length - 1}
          />
        ))}
    </div>
  );
};
