import {
  PokemonDataProps,
  PokemonDetailprops,
  PokemonSpeciesProps,
} from '@/types/common';

export default function extractPokemonDetails(
  results: [PokemonDetailprops, PokemonSpeciesProps],
) {
  const [detail, species] = results;
  const { order, names } = species;
  const { sprites, types } = detail;

  const pokemonData: PokemonDataProps = {
    type: types.map((type) => type.type.name),
    pokedex: order,
    name: names.find((data) => data.language.name === 'ko')?.name as string,
    imageUrl: sprites.front_default,
  };

  return pokemonData;
}
