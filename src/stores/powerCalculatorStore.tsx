import { create } from 'zustand';

import { PokemonDataProps } from '@/types/common';

interface powerCalculatorState {
  attackPokemon: PokemonDataProps | null;
  attackPokemonId: number | null;

  setAttackPokemon: (attackPokemon: PokemonDataProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
}

const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),
}));

export default usePowerCalculatorStore;
