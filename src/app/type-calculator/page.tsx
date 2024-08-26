'use client';

import { TypeCalcAttack } from '@/components/TypeCalcAttack/TypeCalcAttack';
import { TypeModeToggle } from '@/components/TypeModeToggle/TypeModeToggle';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

export default function TypeCalculator() {
  const current = useTypeCalculatorStore((state) => state.current);
  return (
    <main className="h-full flex flex-col gap-8 p-16 pt-8 bg-gray-10">
      <TypeModeToggle />
      {!current && <TypeCalcAttack />}
      {current && <div>방어</div>}
    </main>
  );
}
