import { PokemonDetailprops, PokemonSpeciesProps } from '@/types/common';
import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getPokemons() {
  const res = await commonAxios.get(`/pokemon`).then((res) => res.data);
  return res.results;
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
