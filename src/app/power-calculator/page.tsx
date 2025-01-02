'use client';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonSearchDropDown } from '@/components/PokemonSearchDropDown/PokemonSearchDropDown';
import { PokemonPowerBox } from '@/components/PokemonPowerBox/PokemonPowerBox';
import { MoveSearchDropDown } from '@/components/MoveSearchDropDown/MoveSearchDropDown';
import { CommonSearchDropDown } from '@/components/CommonSearchDropDown/CommonSearchDropDown';
import { CommonCheckBox } from '@/components/CommonCheckBox/CommonCheckBox';
import { PowerDamage } from '@/components/PowerDamage/PowerDamage';
import { ErrorComponent } from '@/components/ErrorComponent/ErrorComponent';

import { FIELD_LIST, WEATHER_LIST } from '@/constants/contents';

export default function PowerCalculator() {
  const {
    attackPokemon,
    attackPokemonId,
    attackInputError,
    defendPokemonId,
    defendInputError,
    isWeaknessHit,
    setIsWeaknessHit,
    move,
  } = usePowerCalculatorStore();

  return (
    <main className="flex flex-col gap-2 items-center p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-10">
      <h1 id="power-calculator" className="sr-only">
        위력 계산기 페이지
      </h1>
      <div className="w-full grid grid-cols-2 gap-6 sm:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg lg:text-xl font-bold">공격</h2>
          <PokemonSearchDropDown usage="attack" />
          {attackInputError && (
            <ErrorComponent message="포켓몬을 찾을 수 없어요" size="small" />
          )}

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
        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg lg:text-xl font-bold">방어</h2>
          <PokemonSearchDropDown usage="defend" />
          {defendInputError && (
            <ErrorComponent message="포켓몬을 찾을 수 없어요" size="small" />
          )}
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
