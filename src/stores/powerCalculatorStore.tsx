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
  defendPokemon: PokemonDataProps | null;
  defendPokemonId: number | null;
  move: MoveInfoProps | null;
  field: FieldType | null;
  weather: WeatherType | null;
  isWeaknessHit: boolean;
  damages: number[];
  selectedIndex: number | null;

  setAttackPokemon: (attackPokemon: PokemonDataProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
  setDefendPokemon: (defendPokemon: PokemonDataProps | null) => void;
  setDefendPokemonId: (defendPokemonId: number | null) => void;
  setMove: (move: MoveInfoProps | null) => void;
  setField: (field: FieldType | null) => void;
  setWeather: (field: WeatherType | null) => void;
  setIsWeaknessHit: (isWeaknessHit: boolean) => void;
  setDamages: (damages: number[]) => void;
  setSelectedIndex: (selectedIndex: number | null) => void;
}

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
  selectedIndex: null,

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),

  setDefendPokemon: (defendPokemon) => set(() => ({ defendPokemon })),
  setDefendPokemonId: (defendPokemonId) => set(() => ({ defendPokemonId })),

  setMove: (move) => set(() => ({ move })),
  setField: (field) => set(() => ({ field })),
  setWeather: (weather) => set(() => ({ weather })),
  setIsWeaknessHit: (isWeaknessHit) => set(() => ({ isWeaknessHit })),
  setDamages: (damages) => set(() => ({ damages })),
  setSelectedIndex: (selectedIndex) => set(() => ({ selectedIndex })),
}));

export default usePowerCalculatorStore;
