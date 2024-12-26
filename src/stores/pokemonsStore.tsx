import { create } from 'zustand';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';
import { PokemonDataProps } from '@/types/common';

interface PokemonsState {
  now: number;
  total: number;
  search: string | null;
  searchIdsList: number[] | null;
  targetPokemon: PokemonDataProps | null;

  setNow: (now: number) => void;
  setTotal: (total: number) => void;
  setSearch: (search: string | null) => void;
  setSearchIdsList: (searchList: number[] | null) => void;
  setTargetPokemon: (targetPokemon: PokemonDataProps | null) => void;
}

const usePokemonsStore = create<PokemonsState>((set) => ({
  now: 1,
  total: TOTAL_POKEMON_NUM,
  search: null,
  searchIdsList: null,
  targetPokemon: null,

  setNow: (now) => set(() => ({ now })),
  setTotal: (total) => set(() => ({ total })),
  setSearch: (search) => set(() => ({ search })),
  setSearchIdsList: (searchIdsList) => set(() => ({ searchIdsList })),
  setTargetPokemon: (targetPokemon) => set(() => ({ targetPokemon })),
}));

export default usePokemonsStore;
