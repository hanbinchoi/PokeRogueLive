import { create } from 'zustand';

interface TypeCalculatorState {
  current: boolean;

  setCurrent: (current: boolean) => void;
}

const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  current: false,

  setCurrent: (current) => set(() => ({ current })),
}));

export default useTypeCalculatorStore;
