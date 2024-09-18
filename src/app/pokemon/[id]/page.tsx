'use client';
import usePokemonsStore from '@/stores/pokemonsStore';

export default function PokemonDetail() {
  const { targetPokemon } = usePokemonsStore();
  console.log(targetPokemon);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>포켓몬 상세 페이지</div>
    </main>
  );
}
