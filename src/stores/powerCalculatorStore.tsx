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
  move: MoveInfoProps | null;
  field: FieldType | null;
  weather: WeatherType | null;

  setAttackPokemon: (attackPokemon: PokemonDataProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
  setMove: (move: MoveInfoProps | null) => void;
  setField: (field: FieldType | null) => void;
  setWeather: (field: WeatherType | null) => void;
}

const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,
  move: null,
  field: null,
  weather: null,

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),
  setMove: (move) => set(() => ({ move })),
  setField: (field) => set(() => ({ field })),
  setWeather: (weather) => set(() => ({ weather })),
}));

export default usePowerCalculatorStore;
