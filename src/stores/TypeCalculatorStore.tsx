import { calcDefendTypeProps, PokemonType } from '@/types/common';
import { create } from 'zustand';

interface TypeCalculatorState {
  current: boolean;
  typeCalcOptions: (PokemonType | null)[];
  defendResult: calcDefendTypeProps;
  teraType: null | string;

  setCurrent: (current: boolean) => void;
  setTeraType: (teraType: null | string) => void;
  setTypeCalcOptions: (typeCalcOptions: (PokemonType | null)[]) => void;
  setDefendResult: (defendResult: calcDefendTypeProps) => void;
}

const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  current: true,
  typeCalcOptions: [null, null],
  defendResult: null,
  teraType: null,

  setCurrent: (current) => set(() => ({ current })),
  setTeraType: (teraType) => set(() => ({ teraType })),
  setTypeCalcOptions: (typeCalcOptions) => set(() => ({ typeCalcOptions })),
  setDefendResult: (defendResult) => set(() => ({ defendResult })),
}));

export default useTypeCalculatorStore;
