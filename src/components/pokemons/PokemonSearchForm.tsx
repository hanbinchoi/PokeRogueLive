'use client';

import { usePokemonSearchForm } from '@/hooks/usePokemonSearchForm';

import { CommonButton } from '../common';
import { PokemonSearchInput } from './PokemonSearchInput';

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
