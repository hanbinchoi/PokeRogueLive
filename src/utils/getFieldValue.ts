import { FieldType, PokemonTypeName } from '@/types/common';

export default function getFieldValue(
  field: FieldType | null,
  attackMoveType: PokemonTypeName,
  defendPokemonType: PokemonTypeName[],
) {
  if (defendPokemonType.find((e) => e === 'flying')) return 1;

  if (field === '일렉트릭') {
    if (attackMoveType === 'electric') return 1.5;
    return 1;
  }
  if (field === '미스트') {
    if (attackMoveType === 'dragon') return 0.5;
    return 1;
  }
  if (field === '사이코') {
    if (attackMoveType === 'psychic') return 1.5;
    return 1;
  }
  if (field === '그래스') {
    if (attackMoveType === 'grass') return 1.3;
    return 1;
  }
  return 1;
}
