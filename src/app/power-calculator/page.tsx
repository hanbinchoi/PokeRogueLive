'use client';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonSearchDropDown } from '@/components/PokemonSearchDropDown/PokemonSearchDropDown';
import { PokemonPowerBox } from '@/components/PokemonPowerBox/PokemonPowerBox';
import { MoveSearchDropDown } from '@/components/MoveSearchDropDown/MoveSearchDropDown';

export default function PowerCalculator() {
  const {
    attackPokemon,
    setAttackPokemon,
    attackPokemonId,
    setAttackPokemonId,
  } = usePowerCalculatorStore();

  return (
    <main className="h-full flex flex-col gap-2 items-center p-8  bg-gray-10">
      <div className="w-full flex gap-20 h-full">
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-xl font-bold -mb-2">공격</h2>
          <PokemonSearchDropDown
            setPokemonId={setAttackPokemonId}
            setPokemon={setAttackPokemon}
          />
          <PokemonPowerBox
            id={attackPokemonId}
            setPokemon={setAttackPokemon}
            pokemon={attackPokemon}
          />
          <MoveSearchDropDown moves={attackPokemon?.moves} />
        </div>
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-xl font-bold -mb-2">방어</h2>
          <PokemonSearchDropDown
            setPokemonId={setAttackPokemonId}
            setPokemon={setAttackPokemon}
          />
          <PokemonPowerBox
            id={attackPokemonId}
            setPokemon={setAttackPokemon}
            pokemon={attackPokemon}
          />
        </div>
      </div>
    </main>
  );
}
