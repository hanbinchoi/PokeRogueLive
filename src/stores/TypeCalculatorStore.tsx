import { create } from 'zustand';

interface TypeCalculatorState {
  current: boolean;
  typeCalcOptions: (string | null)[];

  setCurrent: (current: boolean) => void;
  setTypeCalcOptions: (typeCalcOptions: (string | null)[]) => void;
}

const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  current: false,
  typeCalcOptions: [null, null],

  setCurrent: (current) => set(() => ({ current })),
  setTypeCalcOptions: (typeCalcOptions) => set(() => ({ typeCalcOptions })),
}));

export default useTypeCalculatorStore;
