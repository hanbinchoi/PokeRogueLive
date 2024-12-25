'use client';

import { PokemonSearchForm } from '@/components/PokemonSearchForm/PokemonSearchForm';

export default function Pokemon() {
  return (
    <main
      className="h-full flex flex-col gap-2 items-center p-12 pt-8 bg-gray-10"
      aria-labelledby="pokemon-search">
      <h1 id="pokemon-search" className="sr-only">
        포켓몬 목록
      </h1>
      <div className="w-full">
        <PokemonSearchForm />
      </div>
    </main>
  );
}
