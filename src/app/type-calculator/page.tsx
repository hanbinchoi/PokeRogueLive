'use client';

import {
  TypeModeToggle,
  AttackTypeCalc,
  DefendTypeCalc,
} from '@/components/type-calculator';
import { BattleRole } from '@/constants/contents';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

/**
 * 타입 계산기 페이지.
 *
 * 공격 측 타입 데미지 계산과 방어 측 타입 데미지 계산 기능을 제공합니다.
 * @returns
 */
export default function TypeCalculator() {
  const mode = useTypeCalculatorStore((state) => state.mode);

  return (
    <main className="h-full flex flex-col gap-8 p-6 md:p-16 bg-gray-10">
      <h1 id="type-calculator" className="sr-only">
        타입 계산기 페이지
      </h1>
      <TypeModeToggle />
      {mode === BattleRole.ATTACK ? <AttackTypeCalc /> : <DefendTypeCalc />}
    </main>
  );
}
