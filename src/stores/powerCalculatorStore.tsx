import { create } from 'zustand';

import {
  FieldType,
  MoveInfoProps,
  PokemonDataProps,
  PokemonStatsProps,
  WeatherType,
} from '@/types/common';

interface powerCalculatorState {
  attackPokemon: PokemonDataProps | null;
  attackPokemonId: number | null;
  attackPokemonStats: PokemonStatsProps | null;
  defendPokemon: PokemonDataProps | null;
  defendPokemonId: number | null;
  defendPokemonStats: PokemonStatsProps | null;
  move: MoveInfoProps | null;
  field: FieldType | null;
  weather: WeatherType | null;
  isWeaknessHit: boolean;
  damages: number[];

  setAttackPokemon: (attackPokemon: PokemonDataProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
  setAttackPokemonStats: (attackPokemonStats: PokemonStatsProps | null) => void;
  setDefendPokemon: (defendPokemon: PokemonDataProps | null) => void;
  setDefendPokemonId: (defendPokemonId: number | null) => void;
  setDefendPokemonStats: (defendPokemonStats: PokemonStatsProps | null) => void;
  setMove: (move: MoveInfoProps | null) => void;
  setField: (field: FieldType | null) => void;
  setWeather: (field: WeatherType | null) => void;
  setIsWeaknessHit: (isWeaknessHit: boolean) => void;
  setDamages: (damages: number[]) => void;
}

const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,
  attackPokemonStats: null,
  defendPokemon: null,
  defendPokemonId: null,
  defendPokemonStats: null,
  move: null,
  field: null,
  weather: null,
  isWeaknessHit: false,
  damages: [],

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),
  setAttackPokemonStats: (attackPokemonStats) =>
    set(() => ({ attackPokemonStats })),
  setDefendPokemon: (defendPokemon) => set(() => ({ defendPokemon })),
  setDefendPokemonId: (defendPokemonId) => set(() => ({ defendPokemonId })),
  setDefendPokemonStats: (defendPokemonStats) =>
    set(() => ({ defendPokemonStats })),
  setMove: (move) => set(() => ({ move })),
  setField: (field) => set(() => ({ field })),
  setWeather: (weather) => set(() => ({ weather })),
  setIsWeaknessHit: (isWeaknessHit) => set(() => ({ isWeaknessHit })),
  setDamages: (damages) => set(() => ({ damages })),
}));

export default usePowerCalculatorStore;
