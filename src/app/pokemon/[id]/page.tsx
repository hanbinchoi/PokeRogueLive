'use client';
import { PokemonBasicInfo } from '@/components/PokemonBasicInfo/PokemonBasicInfo';
import { PokemonImgBox } from '@/components/PokemonImgBox/PokemonImgBox';
import usePokemonsStore from '@/stores/pokemonsStore';

export default function PokemonDetail() {
  const { targetPokemon } = usePokemonsStore();

  if (!targetPokemon) return <div>포켓몬이 없어요.</div>;

  return (
    <main className="bg-gray-10 w-full flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full grid grid-cols-3 gap-16">
        <div className="col-span-1">
          <PokemonImgBox pokemon={targetPokemon} usage="detail" />
        </div>
        <div className="col-span-2 ">
          <PokemonBasicInfo pokemon={targetPokemon} />
        </div>
      </div>
    </main>
  );
}
