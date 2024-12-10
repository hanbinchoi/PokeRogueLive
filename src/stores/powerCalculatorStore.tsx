import { PokemonDetailProps } from '@/types/common';
import { create } from 'zustand';

interface powerCalculatorState {
  attackPokemon: PokemonDetailProps | null;
  attackPokemonId: number | null;

  setAttackPokemon: (attackPokemon: PokemonDetailProps | null) => void;
  setAttackPokemonId: (attackPokemonId: number | null) => void;
}

const usePowerCalculatorStore = create<powerCalculatorState>((set) => ({
  attackPokemon: null,
  attackPokemonId: null,

  setAttackPokemon: (attackPokemon) => set(() => ({ attackPokemon })),
  setAttackPokemonId: (attackPokemonId) => set(() => ({ attackPokemonId })),
}));

export default usePowerCalculatorStore;
