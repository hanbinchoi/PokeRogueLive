'use client';

import { useEffect } from 'react';

import { useQuery } from '@tanstack/react-query';

import { getPokemons } from '@/api/pokemon';

import useResponsiveLimit from '@/hooks/useResponsiveLimit';

import usePokemonsStore from '@/stores/pokemonsStore';

import { ErrorComponent, LoadingComponent, PagingDocuments } from '../common';
import { PokemonCard } from './PokemonCard';

import { PokemonsDataProps } from '@/types/data';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

/**
 * 포켓몬 목록을 렌더링 하기 위한 component.
 *
 * 검색어를 입력 한 경우 검색 결과를 요청.
 * 검색어가 없는 경우 현재 페이지 번호(`now`)에 해당하는 포켓몬 목록을 요청
 */
export const PokemonList = () => {
  const {
    limit,
    setLimit,
    total,
    now,
    setNow,
    isSearch,
    searchIdsList,
    pokemonIdsList,
    setPokemonIdsList,
  } = usePokemonsStore();

  const { isLoading, error, data } = useQuery<PokemonsDataProps>({
    queryKey: ['pokemons', now, limit],
    queryFn: () => getPokemons(now, limit),
    enabled: !pokemonIdsList?.length,
  });

  const isError = error || (isSearch && !pokemonIdsList?.length);

  useEffect(() => {
    if (searchIdsList) {
      // 검색을 통해 얻은 포켓몬 id 리스트가 있는경우 limit 만큼 화면에 보여줄 id 셋팅
      setPokemonIdsList(searchIdsList.slice((now - 1) * limit, now * limit));
    } else {
      setPokemonIdsList(null);
    }
  }, [searchIdsList, now, limit]);

  useResponsiveLimit(setLimit);

  return (
    <div className="w-full flex flex-col gap-10 relative ">
      {isLoading && (
        <div className="w-full h-full">
          <LoadingComponent />
        </div>
      )}
      {isError && (
        <div className="w-full h-full">
          <ErrorComponent message="포켓몬을 찾을 수 없어요." />
        </div>
      )}
      <div className="grid py-2 px-14 gap-8 grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {isSearch
          ? pokemonIdsList?.map((pokemonId) => (
              <PokemonCard key={pokemonId} id={pokemonId} />
            ))
          : data?.data.map((pokemon) => (
              <PokemonCard
                key={extractIdFromUrl(pokemon.url)}
                id={extractIdFromUrl(pokemon.url)}
              />
            ))}
      </div>

      <PagingDocuments
        now={now}
        total={total}
        setNow={setNow}
        pageSize={limit}
      />
    </div>
  );
};
