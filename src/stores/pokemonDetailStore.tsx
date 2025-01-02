import { create } from 'zustand';

interface PokemonDetailState {
  now: number;
  total: number;

  setNow: (now: number) => void;
  setTotal: (total: number) => void;
}

/**
 * 포켓몬 상세 페이지 상태를 관리하는 스토어
 */
const usePokemonDetailStore = create<PokemonDetailState>((set) => ({
  now: 1,
  total: 0,

  setNow: (now) => set(() => ({ now })),
  setTotal: (total) => set(() => ({ total })),
}));

export default usePokemonDetailStore;
