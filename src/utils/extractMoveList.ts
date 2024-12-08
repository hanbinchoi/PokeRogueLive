import { MoveInfoProps } from '@/types/common';

export default function extractMoveList(moves: MoveInfoProps[]) {
  const filteredArray = moves.filter((item) => {
    const lastDetail =
      item.version_group_details[item.version_group_details.length - 1];
    return lastDetail.move_learn_method.name === 'level-up';
  });

  const sortedMoves = filteredArray.sort((a, b) => {
    const lastLevelA =
      a.version_group_details[a.version_group_details.length - 1]
        .level_learned_at;
    const lastLevelB =
      b.version_group_details[b.version_group_details.length - 1]
        .level_learned_at;
    return lastLevelA - lastLevelB;
  });

  return sortedMoves;
}
