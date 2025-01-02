import { create } from 'zustand';

import {
  FieldType,
  MoveInfoProps,
  PokemonDataProps,
  WeatherType,
} from '@/types/common';

interface powerCalculatorState {
  attackPokemon: PokemonDataProps | null;
  attackPokemonId: number | null;
  attackInputError: boolean;
  defendPokemon: PokemonDataProps | null;
  defendPokemonId: number | null;
  defendInputError: boolean;
  move: MoveInfoProps | null;
  field: FieldType | null;
  weather: WeatherType | null;
  isWeaknessHit: boolean;
  damages: number[];

  setAttackPokemon: (attackPokemon: PokemonDataProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
  setAttackInputError: (attackInputError: boolean) => void;
  setDefendPokemon: (defendPokemon: PokemonDataProps | null) => void;
  setDefendPokemonId: (defendPokemonId: number | null) => void;
  setDefendInputError: (defendInputError: boolean) => void;
  setMove: (move: MoveInfoProps | null) => void;
  setField: (field: FieldType | null) => void;
  setWeather: (field: WeatherType | null) => void;
  setIsWeaknessHit: (isWeaknessHit: boolean) => void;
  setDamages: (damages: number[]) => void;
}

/**
 * 기술 위력 페이지 상태를 관리하는 스토어
 */
const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,
  attackInputError: false,
  defendPokemon: null,
  defendPokemonId: null,
  defendInputError: false,
  move: null,
  field: null,
  weather: null,
  isWeaknessHit: false,
  damages: [],

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),
  setAttackInputError: (attackInputError) => set(() => ({ attackInputError })),

  setDefendPokemon: (defendPokemon) => set(() => ({ defendPokemon })),
  setDefendPokemonId: (defendPokemonId) => set(() => ({ defendPokemonId })),
  setDefendInputError: (defendInputError) => set(() => ({ defendInputError })),

  setMove: (move) => set(() => ({ move })),
  setField: (field) => set(() => ({ field })),
  setWeather: (weather) => set(() => ({ weather })),
  setIsWeaknessHit: (isWeaknessHit) => set(() => ({ isWeaknessHit })),
  setDamages: (damages) => set(() => ({ damages })),
}));

export default usePowerCalculatorStore;
