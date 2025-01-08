import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { BattleRoleType } from '@/types/common';

import { BattleRole } from '@/constants/contents';

/**
 * 기술 위력 페이지에 필요한 상태를 용도에 맞추어 반환하는 커스텀 hook
 * @param usage - 용도 (`BattleRoleType`)
 * @returns pokemonId와 상태 업데이트 함수
 */
const usePowerCalculatorPokemon = (usage: BattleRoleType) => {
  const store = usePowerCalculatorStore();

  if (usage === BattleRole.ATTACK) {
    return {
      pokemonId: store.attackPokemonId,
      setPokemon: store.setAttackPokemon,
      setPokemonId: store.setAttackPokemonId,
    };
  }

  return {
    pokemonId: store.defendPokemonId,
    setPokemon: store.setDefendPokemon,
    setPokemonId: store.setDefendPokemonId,
  };
};

export default usePowerCalculatorPokemon;
