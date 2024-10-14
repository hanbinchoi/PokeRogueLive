import '../../styles/globals.css';

import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { getPokemonEvolutionChain } from '@/api/pokemon';

import { EvolutionNode } from '../EvolutionNode/EvolutionNode';

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

  if (isLoading) return <div>진화 정보 loading...</div>;
  if (isError) return <div>진화 정보 error</div>;
  return (
    <div className="flex flex-col items-center col-span-1">
      <p className="text-xl font-bold w-full">진화 정보</p>
      {evolutionNodes &&
        evolutionNodes.map((node, i) => (
          <EvolutionNode
            key={i}
            node={node}
            isLast={i === evolutionNodes.length - 1}
          />
        ))}
    </div>
  );
};
