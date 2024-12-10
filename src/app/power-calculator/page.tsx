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
    <main className="h-full flex flex-col gap-2 items-center p-12 pt-8 bg-gray-10">
      <div className="w-full flex">
        <div className="flex flex-col gap-6">
          <PokemonSearchDropDown setPokemonId={setAttackPokemonId} />

          <PokemonPowerBox id={attackPokemonId} />
        </div>
      </div>
    </main>
  );
}
