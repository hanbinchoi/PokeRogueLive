'use client';

import { TypeModeToggle } from '@/components/TypeModeToggle/TypeModeToggle';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

export default function TypeCalculator() {
  const current = useTypeCalculatorStore((state) => state.current);
  return (
    <main className="h-full flex flex-col gap-2 items-center p-12 pt-8 bg-gray-10">
      <TypeModeToggle />
      {!current && <div>공격</div>}
      {current && <div>방어</div>}
    </main>
  );
}
