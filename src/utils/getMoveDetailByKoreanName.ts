import { MoveInfoProps } from '@/types/common';

/**
 * 한글명으로 포켓몬 기술 상세 데이터를 검색 후 가져오는 함수.
 *
 * @param MoveList - 포켓몬 기술 목록 (`MoveInfoProps[]`)
 * @param krName - 기술의 한글명 (`string` | `null`)
 * @return 검색 한 포켓몬 기술 상세 데이터 (`MoveInfoProps` | `null`)
 */
export default function getMoveDetailByKoreanName(
  MoveList: MoveInfoProps[],
  krName: string | null,
): MoveInfoProps | null {
  return MoveList.find((move) => move.krName === krName) || null;
}
