import {
  DataProps,
  PokemonDetailprops,
  PokemonSpeciesProps,
  PokemonsResponseProps,
} from '@/types/common';
import axios from 'axios';

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
  name: string,
): Promise<PokemonSpeciesProps> {
  const res = await commonAxios
    .get(`/pokemon-species/${name}`)
    .then((res) => res.data);
  return res;
}

export async function getPokemon(name: string): Promise<PokemonDetailprops> {
  const res = await commonAxios.get(`/pokemon/${name}`).then((res) => res.data);
  return res;
}
