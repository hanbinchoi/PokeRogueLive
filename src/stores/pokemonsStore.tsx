import { create } from 'zustand';

import { PokemonDataProps } from '@/types/common';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';

interface PokemonsState {
  now: number;
  total: number;
  limit: number;
  search: string | null;
  searchIdsList: number[] | null;
  pokemonIdsList: number[] | null;
  targetPokemon: PokemonDataProps | null;
  isSearch: boolean;

  setNow: (now: number) => void;
  setTotal: (total: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string | null) => void;
  setSearchIdsList: (searchList: number[] | null) => void;
  setPokemonIdsList: (pokemonIdsList: number[] | null) => void;
  setTargetPokemon: (targetPokemon: PokemonDataProps | null) => void;
  setIsSearch: (isSearch: boolean) => void;
}

const usePokemonsStore = create<PokemonsState>((set) => ({
  now: 1,
  total: TOTAL_POKEMON_NUM,
  limit: 0,
  search: null,
  searchIdsList: null,
  pokemonIdsList: null,
  targetPokemon: null,
  isSearch: false,

  setNow: (now) => set(() => ({ now })),
  setTotal: (total) => set(() => ({ total })),
  setLimit: (limit) => set(() => ({ limit })),
  setSearch: (search) => set(() => ({ search })),
  setSearchIdsList: (searchIdsList) => set(() => ({ searchIdsList })),
  setPokemonIdsList: (pokemonIdsList) => set(() => ({ pokemonIdsList })),
  setTargetPokemon: (targetPokemon) => set(() => ({ targetPokemon })),
  setIsSearch: (isSearch) => set(() => ({ isSearch })),
}));

export default usePokemonsStore;
