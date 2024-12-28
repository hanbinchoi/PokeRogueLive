'use client';

import usePokemonsStore from '@/stores/pokemonsStore';

import { PagingDocuments } from '@/components/PagingDocuments/PagingDocuments';
import { PokemonList } from '@/components/PokemonList/PokemonList';
import { PokemonSearchForm } from '@/components/PokemonSearchForm/PokemonSearchForm';

export default function Pokemon() {
  const { now, total, setNow, limit, pokemonIdsList } = usePokemonsStore();
  return (
    <main
      className="flex flex-col gap-2 items-center p-12 pt-8 bg-gray-10 min-w-full"
      aria-labelledby="pokemon-search">
      <h1 id="pokemon-search" className="sr-only">
        포켓몬 목록
      </h1>
      <div className="w-full">
        <PokemonSearchForm />
        <PokemonList pokemonIdsList={pokemonIdsList} now={now} />
        <PagingDocuments
          now={now}
          total={total}
          setNow={setNow}
          pageSize={limit}
        />
      </div>
    </main>
  );
}
