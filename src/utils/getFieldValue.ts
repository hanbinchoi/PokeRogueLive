import { FieldType, PokemonType } from '@/types/common';

import { FIELD } from '@/constants/contents';

export default function getFieldValue(
  field: FieldType | null,
  attackMoveType: PokemonType,
  defendPokemonType: PokemonType[],
) {
  if (defendPokemonType.find((e) => e === 'flying')) return 1;

  if (field === FIELD.ELECTRIC) {
    if (attackMoveType === 'electric') return 1.5;
    return 1;
  }
  if (field === FIELD.MIST) {
    if (attackMoveType === 'dragon') return 0.5;
    return 1;
  }
  if (field === FIELD.PSYCHIC) {
    if (attackMoveType === 'psychic') return 1.5;
    return 1;
  }
  if (field === FIELD.GRASS) {
    if (attackMoveType === 'grass') return 1.3;
    return 1;
  }
  return 1;
}
