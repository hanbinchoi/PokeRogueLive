import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import usePokemonsStore from '@/stores/pokemonsStore';

import { SearchInput } from '../SearchInput/SearchInput';
import { Button } from '../Button/Button';
import { PokemonList } from '../PokemonList/PokemonList';
import { PagingDocuments } from '../PagingDocuments/PagingDocuments';

import { InputValues } from '@/types/common';

import getPokemonsByPartialName from '@/utils/getPokemonsIdByPartialName';

import {
  POKEMON_PAGE_ITEM_SIZE,
  TOTAL_POKEMON_NUM,
} from '@/constants/contents';
import { Tooltip } from '../Tooltip/Tooltip';

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

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm<InputValues>();

  const [pokemonIdsList, setPokemonIdsList] = useState<number[] | null>(null);

  useEffect(() => {
    if (searchIdsList) {
      setPokemonIdsList(searchIdsList.slice((now - 1) * 10, now * 10));
    } else {
      setPokemonIdsList(null);
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') clearErrors('keyword'); // 입력값 변경 시 에러 초기화
  };
  return (
    <>
      <form
        className="flex justify-center gap-[10px] w-full px-80 py-2 mb-6"
        onSubmit={handleSubmit(handleSearchSubmit)}>
        <div className="relative">
          <SearchInput
            placeholder="포켓몬 검색"
            register={register}
            setValue={setValue}
            onChange={handleChange}
            className="min-w-[297px]"
          />
          {errors.keyword && (
            <p className="text-red-10 font-bold text-sm absolute left-0 mt-1">
              {errors.keyword.message}
            </p>
          )}
        </div>
        <Button primary={true} type="submit" size="small" label="검색" />
        <Button
          primary={false}
          type="reset"
          size="small"
          label="초기화"
          disabled={pokemonIdsList === null}
          onClick={handleResetSubmit}
        />
        <Tooltip
          text="전체 목록으로 돌아가시려면 초기화 버튼을 클릭해주세요."
          visible={!!errors.keyword}
        />
      </form>
      <PokemonList pokemonIdsList={pokemonIdsList} now={now} />
      <PagingDocuments
        now={now}
        last={last}
        total={total}
        setNow={setNow}
        setLast={setLast}
        pageSize={POKEMON_PAGE_ITEM_SIZE}
      />
    </>
  );
};
