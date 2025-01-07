import {
  EvolutionChainDataProps,
  EvolutionChainNodeDataProps,
} from '@/types/data';

/**
 * 진화 체인에서 각 진화 노드를 순회하며 각 노드의 진화 정보를 배열 형태로 추출하는 함수.
 *
 * @param evolutionChain - 진화 체인 정보 (`EvolutionChainProps`)
 * @returns 진화 체인의 각 노드에서 추출한 진화 정보 (`EvolutionChainNodeProps[]`)
 */
export default function extractNodes(evolutionChain: EvolutionChainDataProps) {
  const nodes: EvolutionChainNodeDataProps[] = [];

  // 진화 체인을 재귀적으로 순회하면서 진화정보 추출
  const traverseEvolutionChain = (chain: EvolutionChainNodeDataProps) => {
    // 현재 노드의 진화정보 저장
    nodes.push(chain);

    // 다음 진화 단계가 있다면 재귀적으로 탐색
    chain.evolves_to.forEach((evolution) => {
      traverseEvolutionChain(evolution);
    });
  };

  // 최초의 진화 체인 노드에서 시작
  traverseEvolutionChain(evolutionChain.chain);

  return nodes;
}
