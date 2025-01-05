import { create } from 'zustand';

import {
  calcResultType,
  PokemonType,
  SpecialDefendAbilityType,
  typeCalcMode,
} from '@/types/common';

interface TypeCalculatorState {
  mode: typeCalcMode;
  typeCalcDefendOptions: (PokemonType | null)[];
  typeCalcAttackOptions: PokemonType[] | null;
  defendResult: calcResultType;
  teraType: PokemonType | null;
  defendAbility: SpecialDefendAbilityType | null;
  attackMove: string | null;
  attackAbility: string | null;

  setMode: (mode: 'attack' | 'defend') => void;
  setTeraType: (teraType: PokemonType | null) => void;
  setTypeCalcDefendOptions: (
    typeCalcDefendOptions: (PokemonType | null)[],
  ) => void;
  setTypeCalcAttackOptions: (
    typeCalcAttackOptions: PokemonType[] | null,
  ) => void;
  setDefendResult: (defendResult: calcResultType) => void;
  setDefendAbility: (defendAbility: SpecialDefendAbilityType | null) => void;
  setAttackMove: (attackMove: string | null) => void;
  setAttackAbility: (attackAbility: string | null) => void;
}

/**
 * 타입 계산 페이지 상태를 관리하는 스토어
 */
const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  mode: 'defend',
  typeCalcDefendOptions: [null, null],
  typeCalcAttackOptions: null,
  defendResult: null,
  teraType: null,
  defendAbility: null,
  attackMove: null,
  attackAbility: null,

  setMode: (mode) => set(() => ({ mode })),
  setTeraType: (teraType) => set(() => ({ teraType })),
  setTypeCalcDefendOptions: (typeCalcDefendOptions) =>
    set(() => ({ typeCalcDefendOptions })),
  setTypeCalcAttackOptions: (typeCalcAttackOptions) =>
    set(() => ({ typeCalcAttackOptions })),
  setDefendResult: (defendResult) => set(() => ({ defendResult })),
  setDefendAbility: (defendAbility) => set(() => ({ defendAbility })),
  setAttackMove: (attackMove) => set(() => ({ attackMove })),
  setAttackAbility: (attackAbility) => set(() => ({ attackAbility })),
}));

export default useTypeCalculatorStore;
