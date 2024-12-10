'use client';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonSearchDropDown } from '@/components/PokemonSearchDropDown/PokemonSearchDropDown';
import { PokemonPowerBox } from '@/components/PokemonPowerBox/PokemonPowerBox';

export default function PowerCalculator() {
  const {
    attackPokemon,
    setAttackPokemon,
    attackPokemonId,
    setAttackPokemonId,
  } = usePowerCalculatorStore();
  console.log(attackPokemonId);
  return (
    <main className="h-full flex flex-col gap-2 items-center p-8  bg-gray-10">
      <div className="w-full flex gap-20 h-full">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold -mb-2">공격</h2>
          <PokemonSearchDropDown setPokemonId={setAttackPokemonId} />

          <PokemonPowerBox id={attackPokemonId} />
        </div>
        <div className="w-1 h-1/2 self-center bg-type-normal rounded-md"></div>
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold -mb-2">방어</h2>
          <PokemonSearchDropDown setPokemonId={setAttackPokemonId} />

          <PokemonPowerBox id={attackPokemonId} />
        </div>
      </div>
    </main>
  );
}
