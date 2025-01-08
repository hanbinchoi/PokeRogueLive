import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { BattleRoleType } from '@/types/common';

import { BattleRole } from '@/constants/contents';

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
