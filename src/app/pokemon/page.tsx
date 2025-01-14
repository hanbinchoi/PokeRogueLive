import { BottomText } from '@/components/common';
import { PokemonList, PokemonSearchForm } from '@/components/pokemons';

/**
 * 포켓몬 목록 페이지
 *
 * 전체 포켓몬 목록과 검색 기능을 제공합니다.
 */
export default function Pokemon() {
  return (
    <main className="h-full flex flex-col gap-2 items-center justify-center p-12 pt-8 bg-gray-10">
      <h1 className="sr-only">포켓몬 목록</h1>
      <div className="flex flex-col gap-8 h-full items-center justify-center ">
        <PokemonSearchForm />
        <PokemonList />
      </div>
      <BottomText />
    </main>
  );
}
