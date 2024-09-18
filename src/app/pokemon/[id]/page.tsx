'use client';
import usePokemonsStore from '@/stores/pokemonsStore';
import { useParams } from 'next/navigation';

interface PokemonDetailProps {
  params: { id: string };
}
export default function PokemonDetail({ params }: PokemonDetailProps) {
  const { id } = useParams();
  const { targetPokemon } = usePokemonsStore();
  console.log(targetPokemon);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>포켓몬 상세 페이지</div>
    </main>
  );
}
