import { create } from 'zustand';

interface PokemonDetailState {
  now: number;
  total: number;

  setNow: (now: number) => void;
  setTotal: (total: number) => void;
}

const usePokemonDetailStore = create<PokemonDetailState>((set) => ({
  now: 1,
  total: 0,

  setNow: (now) => set(() => ({ now })),
  setTotal: (total) => set(() => ({ total })),
}));

export default usePokemonDetailStore;
