import { create } from 'zustand';

interface PokemonDetailState {
  last: boolean;
  now: number;
  total: number;

  setLast: (last: boolean) => void;
  setNow: (now: number) => void;
  setTotal: (total: number) => void;
}

const usePokemonDetailStore = create<PokemonDetailState>((set) => ({
  last: false,
  now: 1,
  total: 0,

  setLast: (last) => set(() => ({ last })),
  setNow: (now) => set(() => ({ now })),
  setTotal: (total) => set(() => ({ total })),
}));

export default usePokemonDetailStore;
