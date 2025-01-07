import { useQuery } from '@tanstack/react-query';

import { getPokemonMove } from '@/api/pokemon';
import { MoveDetailDataProps } from '@/types/data';

/**
 * 주어진 URL을 사용하여 포켓몬 기술(Move)의 세부 정보를 가져오는 React Query 훅
 *
 * 주요 기능:
 * - 기술 상세 데이터를 Fetch합니다.
 * - 데이터 Fetch 중 로딩 상태(`isLoading`)와 에러 상태(`isError`)를 제공합니다.
 *
 * ```tsx
 * const { data, isLoading, isError } = usePokemonMoveQuery(moveUrl);
 *
 * ```
 *
 * @param {string} url - 조회하려는 포켓몬 기술의 API URL입니다.
 * @returns 포켓몬 기술 요청에 대한 데이터, 로딩, 에러를 한번에 반환합니다.
 */

export default function usePokemonMoveQuery(url: string) {
  const { data, isLoading, isError } = useQuery<MoveDetailDataProps>({
    queryKey: ['detail', url],
    queryFn: () => getPokemonMove(url),
  });

  return {
    data,
    isLoading,
    isError,
  };
}
