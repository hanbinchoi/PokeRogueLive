import { PokemonList, PokemonSearchForm } from '@/components/pokemons';

export default function Pokemon() {
  return (
    <main className="flex flex-col gap-2 items-center p-12 pt-8 bg-gray-10">
      <h1 className="sr-only">포켓몬 목록</h1>
      <div className="flex flex-col h-full">
        <PokemonSearchForm />
        <PokemonList />
      </div>
    </main>
  );
}
