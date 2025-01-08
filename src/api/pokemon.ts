import axios from 'axios';

import {
  AbilityDetailProps,
  EvolutionChainDataProps,
  ItemInfoProps,
  MoveDetailDataProps,
  PokemonDetailDataProps,
  PokemonSpeciesDataProps,
  PokemonsDataProps,
} from '@/types/data';

/**
 * Axios 인스턴스를 생성하여 API 호출을 관리합니다.
 *
 * - `baseURL`은 환경 변수에서 가져옵니다.
 * - 이 인스턴스를 사용하여 공통된 설정을 가진 API 요청을 보낼 수 있습니다.
 *
 */
export const commonAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * 포켓몬 데이터를 API로부터 받아옵니다.
 *
 * - 기본적으로 `page`는 1, `limit`은 10으로 설정됩니다.
 * - `page`와 `limit`을 이용해 데이터의 페이지네이션을 처리합니다.
 * - `offset`은 현재 페이지에 맞게 계산되고, `limit`은 한 페이지당 표시할 항목 수를 설정합니다.
 *
 * @param page - 가져올 페이지 번호 (기본값: 1)
 * @param limit - 한 페이지에 표시할 포켓몬의 수 (기본값: 10)
 * @returns - 포켓몬 데이터 (`data`), 총 포켓몬 수 (`count`), 다음 페이지 URL (`next`)
 *
 */
export async function getPokemons(
  page = 1,
  limit = 10,
): Promise<PokemonsDataProps> {
  const res = await commonAxios
    .get(`/pokemon?offset=${(page - 1) * limit}&limit=${limit}`)
    .then((res) => res.data);

  const { results: data, count, next } = res;
  return { data, count, next };
}

/**
 * 포켓몬 종 데이터(species)를 API로부터 받아옵니다.
 *
 * - API 응답으로부터 넘겨받은 url을 사용합니다. (id와 url의 엔드포인트가 일치하지 않는 경우가 있기때문에 api로부터 넘겨받은 url 그대로 사용)
 * - url을 그대로 넘겨받기 때문에 commonAxios 객체를 사용하지 않습니다.
 *
 * @param url - 요청을 보낼 api url (`string`)
 * @returns - 포켓몬 종 데이터 (`PokemonSpeciesDataProps`)
 */
export async function getPokemonSpecies(
  url: string,
): Promise<PokemonSpeciesDataProps> {
  console.log(url);
  const res = await axios.get(url).then((res) => res.data);
  return res;
}

/**
 * 포켓몬 상세 정보를 API로부터 받아옵니다.
 *
 * @param id - 가져올 포켓몬의 id (`number`)
 * @returns 포켓몬 상세 정보 데이터 (`PokemonDetailDataProps`)
 */
export async function getPokemon(id: number): Promise<PokemonDetailDataProps> {
  const res = await commonAxios.get(`/pokemon/${id}`).then((res) => res.data);
  return res;
}

/**
 * 포켓몬의 진화 정보를 API로부터 받아옵니다.
 * - API 응답으로부터 넘겨받은 url을 사용합니다. (id와 url의 엔드포인트가 일치하지 않는 경우가 있기때문에 api로부터 넘겨받은 url 그대로 사용)
 * - url을 그대로 넘겨받기 때문에 commonAxios 객체를 사용하지 않습니다.
 *
 * @param url - 요청을 보낼 API url (`string`)
 * @returns 진화정보 데이터 (`EvolutionChainDataProps`)
 */
export async function getPokemonEvolutionChain(
  url: string,
): Promise<EvolutionChainDataProps> {
  const res = await axios.get(url).then((res) => res.data);
  return res;
}

/**
 * 포켓몬의 특성 정보를 API로부터 받아옵니다.
 * - API 응답으로부터 넘겨받은 url을 사용합니다. (id와 url의 엔드포인트가 일치하지 않는 경우가 있기때문에 api로부터 넘겨받은 url 그대로 사용)
 * - url을 그대로 넘겨받기 때문에 commonAxios 객체를 사용하지 않습니다.
 *
 * @param url - 요청을 보낼 API url (`string`)
 * @returns 특성 데이터 (`AbilityDetailProps`)
 */
export async function getPokemonAbilityInfo(
  url: string,
): Promise<AbilityDetailProps> {
  const res = await axios.get(url).then((res) => res.data);

  return res;
}

/**
 * 아이템 정보를 API로부터 받아옵니다.
 * - API 응답으로부터 넘겨받은 url을 사용합니다. (id와 url의 엔드포인트가 일치하지 않는 경우가 있기때문에 api로부터 넘겨받은 url 그대로 사용)
 * - url을 그대로 넘겨받기 때문에 commonAxios 객체를 사용하지 않습니다.
 *
 * @param url - 요청을 보낼 API url (`string`)
 * @returns 아이템 정보 데이터 (`ItemInfoProps`)
 */
export async function getItemInfo(url: string): Promise<ItemInfoProps> {
  const res = await axios.get(url).then((res) => res.data);

  return res;
}

/**
 * 기술의 상세 정보를 API로부터 받아옵니다.
 * - API 응답으로부터 넘겨받은 url을 사용합니다. (id와 url의 엔드포인트가 일치하지 않는 경우가 있기때문에 api로부터 넘겨받은 url 그대로 사용)
 * - url을 그대로 넘겨받기 때문에 commonAxios 객체를 사용하지 않습니다.
 *
 * @param url - 요청을 보낼 API url (`string`)
 * @returns 아이템 정보 데이터 (`MoveDetailDataProps`)
 */
export async function getPokemonMove(
  url: string,
): Promise<MoveDetailDataProps> {
  const res = await axios.get(url).then((res) => res.data);

  return res;
}
