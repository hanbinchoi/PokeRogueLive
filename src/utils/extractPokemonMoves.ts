import { MoveInfoProps } from '@/types/common';

import { POKEMON_MOVE_LIST } from '@/constants/contents';

export default function extractPokemonMoves(moves: MoveInfoProps[]) {
  return moves?.map((move) => {
    const match = POKEMON_MOVE_LIST.find(
      (krMove) => krMove.name === move.move.name,
    );
    if (match) {
      return { ...move, krName: match.krName };
    }
    return move;
  });
}
