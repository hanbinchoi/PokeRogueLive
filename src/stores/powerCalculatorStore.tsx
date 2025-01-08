import { create } from 'zustand';

import {
  FieldType,
  MoveInfoProps,
  PokemonDetailProps,
  WeatherType,
} from '@/types/common';

interface powerCalculatorState {
  attackPokemonId: number | null; // 드롭다운을 통해 선택된 공격 포켓몬의 id
  attackPokemon: PokemonDetailProps | null; // 설정된 id를 통해 불러온 포켓몬의 실제 데이터
  defendPokemonId: number | null;
  defendPokemon: PokemonDetailProps | null;

  move: MoveInfoProps | null; // 선택된 기술 정보
  field: FieldType | null; // 선택된 필드 정보
  weather: WeatherType | null; // 선택된 날씨 정보
  isWeaknessHit: boolean; // 약점 타격 여부
  damages: number[]; // 데미지 계산 결과

  setAttackPokemon: (attackPokemon: PokemonDetailProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
  setDefendPokemon: (defendPokemon: PokemonDetailProps | null) => void;
  setDefendPokemonId: (defendPokemonId: number | null) => void;
  setMove: (move: MoveInfoProps | null) => void;
  setField: (field: FieldType | null) => void;
  setWeather: (field: WeatherType | null) => void;
  setIsWeaknessHit: (isWeaknessHit: boolean) => void;
  setDamages: (damages: number[]) => void;
}

/**
 * 위력 계산기 페이지 상태를 관리하는 스토어
 */
const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,
  defendPokemon: null,
  defendPokemonId: null,
  move: null,
  field: null,
  weather: null,
  isWeaknessHit: false,
  damages: [],

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),

  setDefendPokemon: (defendPokemon) => set(() => ({ defendPokemon })),
  setDefendPokemonId: (defendPokemonId) => set(() => ({ defendPokemonId })),

  setMove: (move) => set(() => ({ move })),
  setField: (field) => set(() => ({ field })),
  setWeather: (weather) => set(() => ({ weather })),
  setIsWeaknessHit: (isWeaknessHit) => set(() => ({ isWeaknessHit })),
  setDamages: (damages) => set(() => ({ damages })),
}));

export default usePowerCalculatorStore;
