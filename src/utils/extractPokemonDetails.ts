import {
  PokemonDataProps,
  PokemonDetailProps,
  PokemonSpeciesProps,
  PokemonType,
} from '@/types/common';

export default function extractPokemonDetails(
  results: [PokemonDetailProps, PokemonSpeciesProps],
) {
  const [detail, species] = results;
  const { order, names } = species;
  const { sprites, types } = detail;

  const pokemonData: PokemonDataProps = {
    type: types.map((type) => type.type.name as PokemonType),
    pokedex: order,
    name: names.find((data) => data.language.name === 'ko')?.name as string,
    imageUrl: sprites.front_default,
  };

  return pokemonData;
}
