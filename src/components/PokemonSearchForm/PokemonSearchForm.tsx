import { useEffect } from 'react';

import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { getPokemonIdByKoreanName } from '@/api/pokemon';

import usePokemonsStore from '@/stores/pokemonsStore';

import { SearchInput } from '../SearchInput/SearchInput';
import { Button } from '../Button/Button';
import { PokemonList } from '../PokemonList/PokemonList';
import { PagingDocuments } from '../PagingDocuments/PagingDocuments';

import { InputValues } from '@/types/common';

import getPokemonsByPartialName from '@/utils/getPokemonsIdByPartialName';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';

export const PokemonSearchForm = () => {
  const {
    now,
    total,
    last,
    search,
    searchIdsList,
    setNow,
    setTotal,
    setLast,
    setSearch,
    setSearchIdsList,
  } = usePokemonsStore();

  const { register, handleSubmit, reset } = useForm<InputValues>();

  const { isLoading: isSearchLoading, data } = useQuery({
    queryKey: ['searchPokemon', search],
    queryFn: () => getPokemonIdByKoreanName(search as string),
    retry: 1,
    enabled: search !== null,
  });

  useEffect(() => {
    if (search) {
      setSearchIdsList(getPokemonsByPartialName(search));
      return;
    }
    setSearchIdsList(null);
  }, [search]);

  const handleSearchSubmit = (input: InputValues) => {
    setSearch(input.keyword.trim());
    setTotal(1);
    setLast(true);
  };

  const handleResetSubmit = () => {
    reset();
    setLast(false);
    setNow(1);
    setTotal(TOTAL_POKEMON_NUM);
    setSearch(null);
  };

  if (isSearchLoading) return <div>search loading...</div>;

  return (
    <>
      <form
        className="flex justify-center gap-[10px] w-full px-80 py-2 mb-6"
        onSubmit={handleSubmit(handleSearchSubmit)}>
        <SearchInput
          required={true}
          register={register}
          className="min-w-[297px]"
        />
        <Button
          primary={true}
          type="submit"
          size="small"
          label="검색"
          disabled={isSearchLoading}
        />
        <Button
          primary={false}
          type="reset"
          size="small"
          label="초기화"
          disabled={isSearchLoading}
          onClick={handleSubmit(handleResetSubmit)}
        />
      </form>
      <PokemonList pokemonIdsList={searchIdsList} now={now} />
      <PagingDocuments
        now={now}
        last={last}
        total={total}
        setNow={setNow}
        setLast={setLast}
      />
    </>
  );
};
