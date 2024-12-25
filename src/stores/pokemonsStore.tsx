import { create } from 'zustand';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';
import { PokemonDataProps } from '@/types/common';

interface PokemonsState {
  last: boolean;
  now: number;
  total: number;
  search: string | null;
  searchIdsList: number[] | null;
  targetPokemon: PokemonDataProps | null;

  setLast: (last: boolean) => void;
  setNow: (now: number) => void;
  setTotal: (total: number) => void;
  setSearch: (search: string | null) => void;
  setSearchIdsList: (searchList: number[] | null) => void;
  setTargetPokemon: (targetPokemon: PokemonDataProps | null) => void;
}

const usePokemonsStore = create<PokemonsState>((set) => ({
  last: false,
  now: 1,
  total: TOTAL_POKEMON_NUM,
  search: null,
  searchIdsList: null,
  targetPokemon: null,

  setLast: (last) => set(() => ({ last })),
  setNow: (now) => set(() => ({ now })),
  setTotal: (total) => set(() => ({ total })),
  setSearch: (search) => set(() => ({ search })),
  setSearchIdsList: (searchIdsList) => set(() => ({ searchIdsList })),
  setTargetPokemon: (targetPokemon) => set(() => ({ targetPokemon })),
}));

export default usePokemonsStore;
