import { PokemonTypeName } from '@/types/common';

export default function sortedMap(
  map: Map<string, PokemonTypeName[]>,
): Map<string, PokemonTypeName[]> {
  // Step 1: Extract keys and values from the Map
  const entries = Array.from(map.entries());

  // Step 2: Sort the entries based on the key
  const sortedEntries = entries.sort(([keyA], [keyB]) =>
    keyB.localeCompare(keyA),
  );

  // Step 3: Create a new Map with the sorted entries
  return new Map<string, PokemonTypeName[]>(sortedEntries);
}
