import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonImgBox } from '../common';
import { PokemonStatsEditor } from './PokemonStatsEditor';

import { BattleRoleType } from '@/types/common';

import { BattleRole } from '@/constants/contents';

export interface PokemonStatsPanelProps {
  usage: BattleRoleType;
}

/**
 * 포켓몬 스탯과 기본정보를 보여주는 컴포넌트.
 *
 * 포켓몬의 이름, 이미지, 타입, 스탯 등의 정보를 렌더링합니다.
 *
 * @param usage - 포켓몬 스탯창이 사용 될 역할 (`BattleRoleType`)
 * @returns
 */
export const PokemonStatsPanel = ({ usage }: PokemonStatsPanelProps) => {
  // usage에 따라 상태 및 상태 설정 함수 선택
  const pokemon =
    usage === BattleRole.ATTACK
      ? usePowerCalculatorStore((state) => state.attackPokemon)
      : usePowerCalculatorStore((state) => state.defendPokemon);

  const setPokemon =
    usage === BattleRole.ATTACK
      ? usePowerCalculatorStore((state) => state.setAttackPokemon)
      : usePowerCalculatorStore((state) => state.setDefendPokemon);

  if (pokemon)
    return (
      <div className="pokemon-stats-panel flex flex-col items-center lg:flex-row gap-6 mb-4">
        <PokemonImgBox pokemon={pokemon} usage="power" />
        <PokemonStatsEditor
          stats={pokemon.stats}
          setPokemon={setPokemon}
          pokemon={pokemon}
        />
      </div>
    );
};
