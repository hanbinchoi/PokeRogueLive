import { useForm } from 'react-hook-form';

import useDropdown from '@/hooks/useDropDown';

import usePokemonsStore from '@/stores/pokemonsStore';

import { CommonButton } from '../common';
import { SearchInput } from './SearchInput';

import { InputValues } from '@/types/common';

import getPokemonsByPartialName from '@/utils/getPokemonsIdByPartialName';

import {
  POKEMON_LIST_IN_KOREAN,
  TOTAL_POKEMON_NUM,
} from '@/constants/contents';

export const PokemonSearchForm = () => {
  const { setNow, setTotal, setSearchIdsList, setIsSearch } =
    usePokemonsStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<InputValues>();

  const dropdownControls = useDropdown(POKEMON_LIST_IN_KOREAN);

  const handleSearchSubmit = (input: InputValues) => {
    if (input.keyword.trim() === '') {
      setError('keyword', {
        type: 'manual',
        message: '공백은 검색할 수 없어요.',
      });
      return;
    }
    const pokemonIds = getPokemonsByPartialName(input.keyword.trim());

    setSearchIdsList(pokemonIds);
    setTotal(pokemonIds.length);
    setNow(1);
    setIsSearch(true);
    clearErrors();
  };

  const handleReset = () => {
    reset();
    setSearchIdsList(null);
    setTotal(TOTAL_POKEMON_NUM);
    setNow(1);
    setIsSearch(false);
    dropdownControls.clearSearch();
  };

  return (
    <form
      className="flex justify-center items-center gap-[10px] py-2 mb-6"
      onSubmit={handleSubmit(handleSearchSubmit)}>
      <div className="relative">
        <SearchInput
          onSubmit={handleSearchSubmit}
          placeholder="포켓몬 검색"
          register={register}
          watch={watch}
          handleReset={handleReset}
          setValue={setValue}
          dropdownControls={dropdownControls}
        />
        {errors.keyword && (
          <p className="pl-2 text-red-10 font-bold text-sm absolute left-0 mt-1">
            {errors.keyword.message}
          </p>
        )}
      </div>
      <CommonButton
        primary={true}
        type="submit"
        size="small"
        label="검색"
        className=""
      />
      <CommonButton
        primary={false}
        type="reset"
        size="small"
        label="초기화"
        className="min-w-[36px] min-[480px]:min-w-[62px]"
        onClick={handleReset}
      />
    </form>
  );
};
