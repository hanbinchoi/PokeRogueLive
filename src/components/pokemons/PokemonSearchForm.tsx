'use client';

import { usePokemonSearchForm } from '@/hooks/usePokemonSearchForm';

import { CommonButton } from '../common';
import { PokemonSearchInput } from './PokemonSearchInput';

/**
 * 포켓몬 검색을 위한 form component.
 *
 * 사용자가 입력한 포켓몬 이름을 통해 포켓몬을 검색합니다.
 * 사용자가 제출하는 검색값에 대한 validation을 처리하고, 입력값을 reset할 수 있는 기능을 제공합니다.
 *
 */
export const PokemonSearchForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    errors,
    handleSearchSubmit,
    handleReset,
  } = usePokemonSearchForm();

  return (
    <form
      className="flex justify-center items-center gap-[10px] py-2 mb-6"
      onSubmit={handleSubmit(handleSearchSubmit)}>
      <div className="relative">
        <PokemonSearchInput
          onSubmit={handleSearchSubmit}
          placeholder="포켓몬 검색"
          register={register}
          watch={watch}
          errors={errors}
          handleReset={handleReset}
          setValue={setValue}
        />
      </div>
      <CommonButton primary={true} type="submit" size="small" label="검색" />
    </form>
  );
};
