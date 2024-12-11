import { create } from 'zustand';

import { FieldType, PokemonDataProps, WeatherType } from '@/types/common';

interface powerCalculatorState {
  attackPokemon: PokemonDataProps | null;
  attackPokemonId: number | null;
  field: FieldType | null;
  weather: WeatherType | null;

  setAttackPokemon: (attackPokemon: PokemonDataProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
  setField: (field: FieldType | null) => void;
  setWeather: (field: WeatherType | null) => void;
}

const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,
  field: null,
  weather: null,

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),
  setField: (field) => set(() => ({ field })),
  setWeather: (weather) => set(() => ({ weather })),
}));

export default usePowerCalculatorStore;
