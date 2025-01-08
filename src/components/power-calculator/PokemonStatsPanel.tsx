import { useEffect } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { ErrorComponent, LoadingComponent, PokemonImgBox } from '../common';
import { PokemonStatsEditor } from './PokemonStatsEditor';

import { BattleRoleType } from '@/types/common';

import extractPokemonDetails from '@/utils/extractPokemonDetails';
import { BattleRole } from '@/constants/contents';

export interface PokemonStatsPanelProps {
  id: number;
  usage: BattleRoleType;
}

/**
 * 포켓몬 스탯과 기본정보를 보여주는 컴포넌트.
 *
 * id를 입력받아 실제 데이터를 요청하고 요청받은 데이터를 활용해서 이름, 이미지, 타입, 스탯 등의 정보를 렌더링합니다.
 *
 * @param id - 요청을 보낼 포켓몬의 id (`number`)
 * @param usage - 포켓몬 스탯창이 사용 될 역할 (`BattleRoleType`)
 * @returns
 */
export const PokemonStatsPanel = ({ id, usage }: PokemonStatsPanelProps) => {
  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  // usage에 따라 상태 및 상태 설정 함수 선택
  const pokemon =
    usage === BattleRole.ATTACK
      ? usePowerCalculatorStore((state) => state.attackPokemon)
      : usePowerCalculatorStore((state) => state.defendPokemon);
  const setPokemon =
    usage === BattleRole.ATTACK
      ? usePowerCalculatorStore((state) => state.setAttackPokemon)
      : usePowerCalculatorStore((state) => state.setDefendPokemon);

  const isLoading = isLoadingPokemon || isLoadingSpecies;
  const isError = isErrorPokemon || isErrorSpecies || !pokemon;

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails(pokemonData, speciesData)); // 요청받은 데이터를 usage를 참조하여 공격, 방어 포켓몬으로 설정함.
  }, [pokemonData, speciesData]);

  if (isLoading)
    return (
      <div className="h-[202px] min-h-[202px] lg:min-h-[212px]">
        <LoadingComponent />
      </div>
    );

  if (isError)
    return (
      <div className="h-[202px] min-h-[202px] lg:min-h-[212px]">
        <ErrorComponent size="small" message="포켓몬을 찾을 수 없어요." />
      </div>
    );

  if (pokemon)
    return (
      <div className="flex flex-col items-center lg:flex-row gap-6 mb-4">
        <PokemonImgBox pokemon={pokemon} usage="power" />
        <PokemonStatsEditor
          stats={pokemon.stats}
          setPokemon={setPokemon}
          pokemon={pokemon}
        />
      </div>
    );
};
