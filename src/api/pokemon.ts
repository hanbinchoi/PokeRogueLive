import axios from 'axios';

export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export async function getPokemons() {
  const res = await commonAxios.get(`/pokemon`).then((res) => res.data);
  return res.results;
}

export async function getPokemon(name: string) {
  const res = await commonAxios
    .get(`/pokemon-species/${name}`)
    .then((res) => res.data);
  return res;
}
