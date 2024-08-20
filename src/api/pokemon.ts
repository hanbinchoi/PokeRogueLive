import axios from 'axios';

import {
  PokemonDetailProps,
  PokemonNameProps,
  PokemonSpeciesProps,
  PokemonsResponseProps,
} from '@/types/common';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getPokemons(page = 1): Promise<PokemonsResponseProps> {
  const res = await commonAxios
    .get(`/pokemon?offset=${(page - 1) * 10}&limit=10`)
    .then((res) => res.data);

  const { results: data, count, next } = res;
  return { data, count, next };
}

export async function getPokemonSpecies(
  url: string,
): Promise<PokemonSpeciesProps> {
  const res = await axios.get(url).then((res) => res.data);
  return res;
}

export async function getPokemon(id: number): Promise<PokemonDetailProps> {
  const res = await commonAxios.get(`/pokemon/${id}`).then((res) => res.data);
  return res;
}

export async function getPokemonByKoreanName(
  koreanName: string,
): Promise<number | null> {
  const speciesResponse = await commonAxios.get(
    `/pokemon-species/?limit=${TOTAL_POKEMON_NUM}`,
  );
  const speciesData = speciesResponse.data.results;

  for (const species of speciesData) {
    const speciesDetail = await axios.get(species.url);
    const koreanNameData = speciesDetail.data.names.find(
      (name: PokemonNameProps) => name.language.name === 'ko',
    );

    if (koreanNameData && koreanNameData.name === koreanName) {
      const pokemonId = Number(speciesDetail.data.id);
      return pokemonId;
    }
  }
  return null;
}
