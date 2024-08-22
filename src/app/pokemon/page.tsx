'use client';

import usePokemonsStore from '@/stores/pokemonsStore';

import { PokemonList } from '@/components/PokemonList/PokemonList';
import { PokemonSearchForm } from '@/components/PokemonSearchForm/PokemonSearchForm';

export default function Pokemon() {
  const searchId = usePokemonsStore((state) => state.searchId);

  return (
    <main className="h-full flex flex-col gap-2 items-center p-12 pt-8 bg-gray-10">
      <div className="w-full">
        <PokemonSearchForm />
        <PokemonList pokemonId={searchId} />
      </div>
    </main>
  );
}
