'use client';

import { useForm } from 'react-hook-form';

import { Button } from '@/components/Button/Button';
import { Logo } from '@/components/Logo/Logo';
import { SearchInput } from '@/components/SearchInput/SearchInput';

import { InputValues } from '@/types/common';
import { PokemonList } from '@/components/PokemonList/PokemonList';

export default function Pokemon() {
  const { register, handleSubmit, reset } = useForm<InputValues>();

  const onSubmit = (data: InputValues) => {
    console.log(data);
    reset();
  };
  return (
    <main className="h-full flex flex-col gap-2 items-center p-12 pt-4 bg-gray-10">
      <Logo size="large" />
      <div className="w-full">
        <form
          className="flex justify-center gap-[10px] w-full px-80 py-2 mb-6"
          onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            required={true}
            register={register}
            className="min-w-[297px]"
          />
          <Button primary={true} size="small" label="검색" />
        </form>
        <PokemonList />
      </div>
    </main>
  );
}
