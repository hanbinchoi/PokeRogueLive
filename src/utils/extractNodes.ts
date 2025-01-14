import {
  EvolutionChainDataProps,
  EvolutionChainNodeDataProps,
} from '@/types/data';

/**
 * 진화 체인에서 각 진화 노드를 순회하며 각 노드 별 진화 경로를 추출하는 함수.
 *
 * @param evolutionChain - 진화 체인 정보 (`EvolutionChainProps`)
 * @returns 진화 체인의 각 노드에서 추출한 진화 정보 (`EvolutionChainNodeDataProps[]`)
 */
export default function extractNodes(evolutionChain: EvolutionChainDataProps) {
  // 진화 체인을 재귀적으로 순회하면서 진화정보 추출
  const getEvolutionPaths = (
    chain: EvolutionChainNodeDataProps,
    path: EvolutionChainNodeDataProps[],
  ) => {
    const currentPath = [...path, chain];
    const results: EvolutionChainNodeDataProps[][] = [];

    if (chain.evolves_to.length === 0) {
      results.push(currentPath);
      return results;
    }

    // 각 evolves_to를 순회하며 재귀적으로 경로 생성
    for (const nextChain of chain.evolves_to) {
      results.push(...getEvolutionPaths(nextChain, currentPath));
    }

    return results;
  };

  return getEvolutionPaths(evolutionChain.chain, []);
}
