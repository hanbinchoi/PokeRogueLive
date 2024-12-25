import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

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
    searchIdsList,
    setNow,
    setTotal,
    setLast,
    setSearchIdsList,
  } = usePokemonsStore();

  const [pokemonIdsList, setPokemonIdsList] = useState<number[] | null>(null);
  const { register, handleSubmit, reset } = useForm<InputValues>();

  useEffect(() => {
    if (searchIdsList) {
      return setPokemonIdsList(
        searchIdsList.slice((now - 1) * 10, (now - 1) * 10 + 10),
      );
    }
    return setPokemonIdsList(null);
  }, [searchIdsList, now]);

  const handleSearchSubmit = (input: InputValues) => {
    const pokemonIds = getPokemonsByPartialName(input.keyword.trim());
    setSearchIdsList(pokemonIds);
    setTotal(pokemonIds.length);
    setNow(1);
  };

  const handleResetSubmit = () => {
    reset();
    setSearchIdsList(null);
    setTotal(TOTAL_POKEMON_NUM);
    setNow(1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.trim() === '') handleResetSubmit();
  };

  return (
    <>
      <form
        className="flex justify-center gap-[10px] w-full px-80 py-2 mb-6"
        onSubmit={handleSubmit(handleSearchSubmit)}>
        <SearchInput
          required={true}
          register={register}
          className="min-w-[297px]"
          onChange={handleInputChange}
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
      <PokemonList pokemonIdsList={pokemonIdsList} now={now} />
      <PagingDocuments
        now={now}
        last={last}
        total={total}
        setNow={setNow}
        setLast={setLast}
        pageSize={PAGE_ITEM_SIZE}
      />
    </>
  );
};

const PAGE_ITEM_SIZE = 10;
