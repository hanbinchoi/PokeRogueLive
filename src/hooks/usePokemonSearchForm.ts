import { useForm } from 'react-hook-form';

import usePokemonsStore from '@/stores/pokemonsStore';

import { InputValues } from '@/types/common';

import getPokemonsByPartialName from '@/utils/getPokemonsIdByPartialName';

import { TOTAL_POKEMON_NUM } from '@/constants/contents';

/**
 * 포켓몬 검색 폼의 로직을 관리하는 커스텀 훅
 *
 * 이 훅은 다음과 같은 기능을 수행합니다:
 * - `react-hook-form`을 사용한 폼 상태 관리
 * - 검색어를 기반으로 포켓몬 검색
 * - 검색 폼과 결과 초기화
 */
export const usePokemonSearchForm = () => {
  const { setNow, setTotal, setSearchIdsList, setIsSearch } =
    usePokemonsStore();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<InputValues>();

  /**
   * 검색 폼 제출을 처리하는 함수
   * - 공백은 에러 처리
   * - 입력 키워드와 일치하는 포켓몬 검색
   * - 검색 결과를 글로벌 상태에 업데이트
   *
   * @param input - 검색 폼의 입력 값 (`InputValues`)
   */
  const handleSearchSubmit = (input: InputValues) => {
    if (input.keyword.trim() === '') {
      return setError('keyword', {
        type: 'manual',
        message: '공백은 검색할 수 없어요.',
      });
    }

    const pokemonIds = getPokemonsByPartialName(input.keyword.trim());

    setSearchIdsList(pokemonIds);
    setTotal(pokemonIds.length);
    setNow(1);
    setIsSearch(true);
    clearErrors();
  };

  /**
   * 검색 폼과 상태를 초기화하는 함수
   * - 검색 입력 필드를 초기화
   * - 포켓몬 목록을 기본 상태로 복원
   * - 검색 관련 글로벌 상태를 초기화
   *
   */
  const handleReset = () => {
    reset();
    setSearchIdsList(null);
    setTotal(TOTAL_POKEMON_NUM);
    setNow(1);
    setIsSearch(false);
  };

  return {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    errors,
    handleSearchSubmit,
    handleReset,
  };
};
