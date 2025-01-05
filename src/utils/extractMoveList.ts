import { MoveInfoProps } from '@/types/common';
import { MoveDataProps } from '@/types/data';

import { POKEMON_MOVE_LIST } from '@/constants/contents';

/** API로 부터 받은 기술 목록을 사용하기 위한 형태로 형변환 하는 함수
 * 1. 기술 이름을 한글로 번역
 * 2. 만약 한글로 등록되지 않은 기술일 경우 원문 그대로 사용
 * 3. 변환한 기술 목록을 배열형태로 반환
 *
 * @param moves - API로 부터 받은 기술 목록 (`MoveDataProps[]`)
 * @return 변환한 기술 목록 (`MoveInfoProps[]`)
 */
export default function extractMoveList(
  moves: MoveDataProps[],
): MoveInfoProps[] {
  return moves?.map((move) => {
    const match = POKEMON_MOVE_LIST.find(
      (krMove) => krMove.name === move.move.name,
    );
    if (match) {
      return { ...move, krName: match.krName };
    }
    return { ...move, krName: move.move.name };
  });
}
