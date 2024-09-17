'use client';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeCalcDefend } from '@/components/TypeCalcDefend/TypeCalcDefend';
import { TypeModeToggle } from '@/components/TypeModeToggle/TypeModeToggle';
import { TypeCalcAttack } from '@/components/TypeCalcAttack/TypeCalcAttack';

export default function TypeCalculator() {
  const mode = useTypeCalculatorStore((state) => state.mode);

  return (
    <main className="h-full flex flex-col gap-8 p-16 pt-8 bg-gray-10">
      <TypeModeToggle />
      {mode === 'attack' ? <TypeCalcAttack /> : <TypeCalcDefend />}
    </main>
  );
}
