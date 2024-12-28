'use client';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonSearchDropDown } from '@/components/PokemonSearchDropDown/PokemonSearchDropDown';
import { PokemonPowerBox } from '@/components/PokemonPowerBox/PokemonPowerBox';
import { MoveSearchDropDown } from '@/components/MoveSearchDropDown/MoveSearchDropDown';
import { CommonSearchDropDown } from '@/components/CommonSearchDropDown/CommonSearchDropDown';
import { CommonCheckBox } from '@/components/CommonCheckBox/CommonCheckBox';
import { PowerDamage } from '@/components/PowerDamage/PowerDamage';

import { FIELD_LIST, WEATHER_LIST } from '@/constants/contents';

export default function PowerCalculator() {
  const {
    attackPokemon,
    attackPokemonId,
    defendPokemonId,
    isWeaknessHit,
    setIsWeaknessHit,
    move,
  } = usePowerCalculatorStore();

  return (
    <main className="h-full flex flex-col gap-2 items-center p-8  bg-gray-10">
      <h1 id="power-calculator" className="sr-only">
        위력 계산기 페이지
      </h1>
      <div className="w-full flex gap-20 h-full">
        <div className="flex flex-col gap-6 w-full">
          <h2 className="text-xl font-bold -mb-2">공격</h2>
          <PokemonSearchDropDown usage="attack" />
          {attackPokemonId && (
            <>
              <PokemonPowerBox id={attackPokemonId} usage="attack" />
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
          <PokemonSearchDropDown usage="defend" />
          {defendPokemonId && (
            <>
              <PokemonPowerBox id={defendPokemonId} usage="defend" />
              {move && <PowerDamage moveUrl={move.move.url} />}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
