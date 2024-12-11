'use client';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonSearchDropDown } from '@/components/PokemonSearchDropDown/PokemonSearchDropDown';
import { PokemonPowerBox } from '@/components/PokemonPowerBox/PokemonPowerBox';
import { MoveSearchDropDown } from '@/components/MoveSearchDropDown/MoveSearchDropDown';
import { CommonSearchDropDown } from '@/components/CommonSearchDropDown/CommonSearchDropDown';

import { FIELD_LIST, WEATHER_LIST } from '@/constants/contents';
import { CommonCheckBox } from '@/components/CommonCheckBox/CommonCheckBox';
import { PowerDamage } from '@/components/PowerDamage/PowerDamage';

export default function PowerCalculator() {
  const {
    attackPokemon,
    setAttackPokemon,
    attackPokemonId,
    setAttackPokemonId,
    defendPokemon,
    defendPokemonId,
    setDefendPokemon,
    setDefendPokemonId,
    isWeaknessHit,
    setIsWeaknessHit,
    move,
  } = usePowerCalculatorStore();

  return (
    <main className="h-full flex flex-col gap-2 items-center p-8  bg-gray-10">
      <div className="w-full flex gap-20 h-full">
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-xl font-bold -mb-2">공격</h2>
          <PokemonSearchDropDown
            usage="attack"
            setPokemonId={setAttackPokemonId}
            setPokemon={setAttackPokemon}
          />
          {attackPokemonId && (
            <>
              <PokemonPowerBox
                id={attackPokemonId}
                setPokemon={setAttackPokemon}
                pokemon={attackPokemon}
                usage="attack"
              />
              <MoveSearchDropDown moves={attackPokemon?.moves} />
              <CommonSearchDropDown label="날씨" options={WEATHER_LIST} />
              <CommonSearchDropDown label="필드" options={FIELD_LIST} />
              <CommonCheckBox
                label="급소에 맞았습니다."
                isChecked={isWeaknessHit}
                setIsChecked={setIsWeaknessHit}
              />
            </>
          )}
        </div>
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-xl font-bold -mb-2">방어</h2>
          <PokemonSearchDropDown
            usage={'defend'}
            setPokemonId={setDefendPokemonId}
            setPokemon={setDefendPokemon}
          />
          {defendPokemonId && (
            <>
              <PokemonPowerBox
                id={defendPokemonId}
                setPokemon={setDefendPokemon}
                pokemon={defendPokemon}
                usage="defend"
              />
              {move && <PowerDamage moveUrl={move.move.url} />}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
