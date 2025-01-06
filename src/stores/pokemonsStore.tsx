import { create } from 'zustand';

import { PokemonDetailProps } from '@/types/common';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';

interface PokemonsState {
  now: number; // 현재 페이지 번호
  total: number; // 전체 포켓몬 개수 (기본값: TOTAL_POKEMON_NUM)
  limit: number; // 한 페이지에 보여줄 포켓몬 수
  search: string | null; // 검색어 (없으면 null)
  searchIdsList: number[] | null; // 검색 결과로 반환된 포켓몬 ID 목록
  pokemonIdsList: number[] | null; // 실제로 화면에 표시될 포켓몬 ID 목록 (`searchIdsList`에서 `limit`만큼 선택)
  targetPokemon: PokemonDetailProps | null; // 선택된 포켓몬 상세 정보
  isSearch: boolean; // 현재 검색 상태인지 여부

  setNow: (now: number) => void;
  setTotal: (total: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string | null) => void;
  setSearchIdsList: (searchList: number[] | null) => void;
  setPokemonIdsList: (pokemonIdsList: number[] | null) => void;
  setTargetPokemon: (targetPokemon: PokemonDetailProps | null) => void;
  setIsSearch: (isSearch: boolean) => void;
}

/**
 * 포켓몬 목록 페이지 상태를 관리하는 스토어
 */
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
