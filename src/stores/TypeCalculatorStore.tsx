import { calcDefendTypeProps, PokemonType } from '@/types/common';
import { create } from 'zustand';

interface TypeCalculatorState {
  current: boolean;
  typeCalcOptions: (PokemonType | null)[];
  defendResult: calcDefendTypeProps | null;

  setCurrent: (current: boolean) => void;
  setTypeCalcOptions: (typeCalcOptions: (PokemonType | null)[]) => void;
  setDefendResult: (defendResult: calcDefendTypeProps | null) => void;
}

const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  current: true,
  typeCalcOptions: [null, null],
  defendResult: null,

  setCurrent: (current) => set(() => ({ current })),
  setTypeCalcOptions: (typeCalcOptions) => set(() => ({ typeCalcOptions })),
  setDefendResult: (defendResult) => set(() => ({ defendResult })),
}));

export default useTypeCalculatorStore;
