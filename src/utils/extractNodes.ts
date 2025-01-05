import { EvolutionChainNodeProps, EvolutionChainProps } from '@/types/common';

/**
 * 진화 체인에서 각 진화 노드를 순회하며 species의 URL을 추출하는 함수.
 *
 * @param evolutionChain - 진화 체인 정보 (`EvolutionChainProps`)
 * @returns 진화 체인의 각 노드에서 추출한 species의 URL 목록 (`EvolutionChainNodeProps[]`)
 */
export default function extractNodes(evolutionChain: EvolutionChainProps) {
  const urls: EvolutionChainNodeProps[] = [];

  // 진화 체인을 재귀적으로 순회하면서 species의 URL 추출
  const traverseEvolutionChain = (chain: EvolutionChainNodeProps) => {
    // 현재 species의 URL 저장
    urls.push(chain);

    // 다음 진화 단계가 있다면 재귀적으로 탐색
    chain.evolves_to.forEach((evolution) => {
      traverseEvolutionChain(evolution);
    });
  };

  // 최초의 진화 체인 노드에서 시작
  traverseEvolutionChain(evolutionChain.chain);

  return urls;
}
