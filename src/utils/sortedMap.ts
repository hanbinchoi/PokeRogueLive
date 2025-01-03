import { PokemonTypeName } from '@/types/common';

export default function sortedMap(
  map: Map<number, PokemonTypeName[]>,
): Map<number, PokemonTypeName[]> {
  // Step 1: Extract keys and values from the Map
  const entries = Array.from(map.entries());

  // Step 2: Sort the entries based on the key (numerical sort)
  const sortedEntries = entries.sort(([keyA], [keyB]) => keyB - keyA);

  // Step 3: Create a new Map with the sorted entries
  return new Map(sortedEntries);
}
