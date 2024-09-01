import { PokemonType } from '@/types/common';
import { create } from 'zustand';

interface TypeCalculatorState {
  current: boolean;
  typeCalcOptions: (PokemonType | null)[];

  setCurrent: (current: boolean) => void;
  setTypeCalcOptions: (typeCalcOptions: (PokemonType | null)[]) => void;
}

const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  current: true,
  typeCalcOptions: [null, null],

  setCurrent: (current) => set(() => ({ current })),
  setTypeCalcOptions: (typeCalcOptions) => set(() => ({ typeCalcOptions })),
}));

export default useTypeCalculatorStore;
