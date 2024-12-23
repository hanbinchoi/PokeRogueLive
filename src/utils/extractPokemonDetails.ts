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

  const {
    order,
    names,
    capture_rate,
    evolution_chain,
    flavor_text_entries,
    genera,
    is_legendary,
    is_mythical,
  } = species;

  const {
    sprites,
    types,
    abilities,
    base_experience,
    cries,
    height,
    moves,
    stats,
    weight,
  } = detail;

  stats.find((s) => s.stat.name === 'lv') &&
    stats.unshift({
      base_stat: 50,
      effort: 0,
      stat: { name: 'lv', url: 'unknown' },
    });

  const pokemonData: PokemonDataProps = {
    type: types.map((type) => type.type.name as PokemonType),
    pokedex: order,
    name: names.find((data) => data.language.name === 'ko')?.name as string,
    imageUrl: sprites.front_default,
    abilitiesInfo: abilities,
    base_experience,
    cries: cries.latest,
    height,
    moves,
    stats,
    weight,
    capture_rate,
    evolution_chain: evolution_chain.url,
    flavor_text: flavor_text_entries.find(
      (flavor) => flavor.language.name === 'ko',
    )?.flavor_text as string,
    genera: genera.find((g) => g.language.name === 'ko')?.genus as string,
    is_legendary,
    is_mythical,
  };

  return pokemonData;
}
