'use client';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import {
  BottomText,
  CommonCheckBox,
  CommonSearchDropdown,
} from '@/components/common';
import {
  PokemonStatsPanel,
  PokemonSearchDropdown,
  PowerDamageResult,
} from '@/components/power-calculator';

import extractMoveList from '@/utils/extractMoveList';

import { BattleRole, Field, Weather } from '@/constants/contents';

/**
 * 위력 계산기 페이지
 *
 * - 공격 및 방어 포켓몬과 관련된 데이터를 입력받아 위력 계산 결과를 출력합니다.
 */
export default function PowerCalculator() {
  const { attackPokemon, isWeaknessHit, setIsWeaknessHit } =
    usePowerCalculatorStore();

  return (
    <main className="flex flex-col gap-2 items-center p-6 sm:p-8 md:p-10 lg:p-12 bg-gray-10">
      <h1 className="sr-only">위력 계산기 페이지</h1>
      <div className="w-full grid grid-cols-2 gap-6 sm:gap-12">
        <div className="flex flex-col gap-3">
          <h2 className="text-base md:text-lg lg:text-xl font-bold">공격</h2>
          <PokemonSearchDropdown usage={BattleRole.ATTACK} />
          <PokemonStatsPanel usage={BattleRole.ATTACK} />

          {attackPokemon && (
            <>
              <CommonSearchDropdown
                label="기술"
                options={extractMoveList(attackPokemon?.moves).map(
                  (m) => m.krName,
                )}
              />
              <CommonSearchDropdown
                label="날씨"
                options={Object.values(Weather)}
              />
              <CommonSearchDropdown
                label="필드"
                options={Object.values(Field)}
              />
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
          <PokemonSearchDropdown usage={BattleRole.DEFEND} />
          <PokemonStatsPanel usage={BattleRole.DEFEND} />
          <PowerDamageResult />
        </div>
      </div>
      {attackPokemon && <BottomText />}
    </main>
  );
}
