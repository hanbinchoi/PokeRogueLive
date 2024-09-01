'use client';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeCalcDefend } from '@/components/TypeCalcDefend/TypeCalcDefend';
import { TypeModeToggle } from '@/components/TypeModeToggle/TypeModeToggle';

export default function TypeCalculator() {
  const current = useTypeCalculatorStore((state) => state.current);
  return (
    <main className="h-full flex flex-col gap-8 p-16 pt-8 bg-gray-10">
      <TypeModeToggle />
      {!current && <div>공격</div>}
      {current && <TypeCalcDefend />}
    </main>
  );
}
