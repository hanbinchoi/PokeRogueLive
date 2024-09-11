import { calcDefendTypeProps, PokemonType } from '@/types/common';
import { create } from 'zustand';

interface TypeCalculatorState {
  mode: 'attack' | 'defend';
  typeCalcDefendOptions: (PokemonType | null)[];
  typeCalcAttackOptions: PokemonType[] | null;
  defendResult: calcDefendTypeProps;
  teraType: null | string;
  defendAbility: null | string;

  setMode: (mode: 'attack' | 'defend') => void;
  setTeraType: (teraType: null | string) => void;
  setTypeCalcDefendOptions: (
    typeCalcDefendOptions: (PokemonType | null)[],
  ) => void;
  setTypeCalcAttackOptions: (
    typeCalcAttackOptions: PokemonType[] | null,
  ) => void;
  setDefendResult: (defendResult: calcDefendTypeProps) => void;
  setDefendAbility: (defendAbility: string | null) => void;
}

const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  mode: 'defend',
  typeCalcDefendOptions: [null, null],
  typeCalcAttackOptions: null,
  defendResult: null,
  teraType: null,
  defendAbility: null,

  setMode: (mode) => set(() => ({ mode })),
  setTeraType: (teraType) => set(() => ({ teraType })),
  setTypeCalcDefendOptions: (typeCalcDefendOptions) =>
    set(() => ({ typeCalcDefendOptions })),
  setTypeCalcAttackOptions: (typeCalcAttackOptions) =>
    set(() => ({ typeCalcAttackOptions })),
  setDefendResult: (defendResult) => set(() => ({ defendResult })),
  setDefendAbility: (defendAbility) => set(() => ({ defendAbility })),
}));

export default useTypeCalculatorStore;
