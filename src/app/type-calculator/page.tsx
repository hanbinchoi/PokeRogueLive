'use client';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeCalcDefend } from '@/components/type-calculator/TypeCalcDefend';
import { TypeModeToggle } from '@/components/type-calculator/TypeModeToggle';
import { TypeCalcAttack } from '@/components/type-calculator/TypeCalcAttack';

export default function TypeCalculator() {
  const mode = useTypeCalculatorStore((state) => state.mode);

  return (
    <main className="h-full flex flex-col gap-8 p-6 md:p-16 bg-gray-10">
      <h1 id="type-calculator" className="sr-only">
        타입 계산기 페이지
      </h1>
      <TypeModeToggle />
      {mode === 'attack' ? <TypeCalcAttack /> : <TypeCalcDefend />}
    </main>
  );
}
