import { create } from 'zustand';

import {
  PokemonType,
  SpecialAttackAbilityType,
  SpecialAttackMoveType,
  SpecialDefendAbilityType,
  typeCalcMode,
} from '@/types/common';

interface TypeCalculatorState {
  mode: typeCalcMode; // 타입 계산기 모드 (공격 || 방어)

  checkedDefendOptions: (PokemonType | null)[]; // 선택된 방어 타입
  teraType: PokemonType | null; // 선택된 테라 타입
  defendAbility: SpecialDefendAbilityType | null; // 선택된 방어 특성

  checkedAttackOptions: PokemonType[] | null; // 선택된 공격 타입
  attackMove: SpecialAttackMoveType | null; // 선택된 공격 기술
  attackAbility: SpecialAttackAbilityType | null; // 선택된 공격 특성

  setMode: (mode: typeCalcMode) => void;
  setTeraType: (teraType: PokemonType | null) => void;
  setTypeCalcDefendOptions: (
    checkedDefendOptions: (PokemonType | null)[],
  ) => void;
  setTypeCalcAttackOptions: (
    checkedAttackOptions: PokemonType[] | null,
  ) => void;
  setDefendAbility: (defendAbility: SpecialDefendAbilityType | null) => void;
  setAttackMove: (attackMove: SpecialAttackMoveType | null) => void;
  setAttackAbility: (attackAbility: SpecialAttackAbilityType | null) => void;
}

/**
 * 타입 계산 페이지 상태를 관리하는 스토어
 */
const useTypeCalculatorStore = create<TypeCalculatorState>((set) => ({
  mode: 'defend',
  checkedDefendOptions: [null, null],
  checkedAttackOptions: null,
  teraType: null,
  defendAbility: null,
  attackMove: null,
  attackAbility: null,

  setMode: (mode) => set(() => ({ mode })),
  setTeraType: (teraType) => set(() => ({ teraType })),
  setTypeCalcDefendOptions: (checkedDefendOptions) =>
    set(() => ({ checkedDefendOptions })),
  setTypeCalcAttackOptions: (checkedAttackOptions) =>
    set(() => ({ checkedAttackOptions })),
  setDefendAbility: (defendAbility) => set(() => ({ defendAbility })),
  setAttackMove: (attackMove) => set(() => ({ attackMove })),
  setAttackAbility: (attackAbility) => set(() => ({ attackAbility })),
}));

export default useTypeCalculatorStore;
