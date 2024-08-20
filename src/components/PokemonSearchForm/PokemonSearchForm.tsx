import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { getPokemonByKoreanName } from '@/api/pokemon';

import usePokemonsStore from '@/stores/pokemonsStore';

import { SearchInput } from '../SearchInput/SearchInput';
import { Button } from '../Button/Button';

import { InputValues } from '@/types/common';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';

export const PokemonSearchForm = () => {
  const { register, handleSubmit, reset } = useForm<InputValues>();
  const { setTotal, setSearch, setNow, setLast, search, setSearchId } =
    usePokemonsStore();

  const { isLoading: isSearchLoading, data } = useQuery({
    queryKey: ['searchPokemon', search],
    queryFn: () => getPokemonByKoreanName(search as string),
    retry: 3,
    enabled: search !== null,
  });

  useEffect(() => {
    if (search) {
      setSearchId(data as number);
      return;
    }
    if (!search) {
      setSearchId(null);
    }
  }, [search, data]);

  const handleSearchSubmit = (input: InputValues) => {
    setSearch(input.keyword);
    setTotal(1);
    setLast(true);
  };

  const handleResetSubmit = (input: InputValues) => {
    if (!input.keyword) return;
    reset();
    setLast(false);
    setNow(1);
    setTotal(TOTAL_POKEMON_NUM);
    setSearch(null);
  };

  if (isSearchLoading) return <div>search loading...</div>;

  return (
    <form
      className="flex justify-center gap-[10px] w-full px-80 py-2 mb-6"
      onSubmit={handleSubmit(handleSearchSubmit)}>
      <SearchInput
        required={true}
        register={register}
        className="min-w-[297px]"
      />
      <Button primary={true} type="submit" size="small" label="검색" />
      <Button
        primary={false}
        type="reset"
        size="small"
        label="초기화"
        onClick={handleSubmit(handleResetSubmit)}
      />
    </form>
  );
};
