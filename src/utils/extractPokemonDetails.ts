import { PokemonDetailProps, PokemonType } from '@/types/common';
import { PokemonDetailDataProps, PokemonSpeciesDataProps } from '@/types/data';

/**
 * API 응답에서 받은 포켓몬의 상세 정보와 종 정보를 통합하여, 필요한 형태로 변환하는 함수.
 *
 * 포켓몬 상세 정보 구성을 위해 총 2개의 api가 필요하여, 2개의 api로 부터 받은 데이터를 원하는 형태로 변환하는 과정.
 *
 * @param detail - 포켓몬의 상세 정보 (`PokemonDetailDataProps`)
 * @param species - 포켓몬 종 정보 (`PokemonSpeciesDataProps`)
 * @returns 변환된 포켓몬 데이터 (`PokemonDetailProps`)
 */

export default function extractPokemonDetails(
  detail: PokemonDetailDataProps,
  species: PokemonSpeciesDataProps,
) {
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

  if (!stats.find((s) => s.stat.name === 'lv')) {
    stats.unshift({
      base_stat: 50,
      effort: 0,
      stat: { name: 'lv', url: 'unknown' },
    });
  }

  const pokemonData: PokemonDetailProps = {
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
