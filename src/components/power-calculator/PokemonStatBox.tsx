import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonStatInput } from './PokemonStatInput';

import { BattleRoleType, PokemonDetailProps } from '@/types/common';
import { StatDataProps } from '@/types/data';
import { BattleRole } from '@/constants/contents';

export interface PokemonStatBoxProps {
  stats: StatDataProps[];
  pokemon: PokemonDetailProps;
  usage: BattleRoleType;
}

export const PokemonStatBox = ({
  stats,
  usage,
  pokemon,
}: PokemonStatBoxProps) => {
  const { setAttackPokemon, setDefendPokemon } = usePowerCalculatorStore();
  const setPokemon =
    usage === BattleRole.ATTACK ? setAttackPokemon : setDefendPokemon;

  return (
    <div className="flex flex-col gap-2 justify-center">
      {stats.map((stat) => (
        <PokemonStatInput
          key={stat.stat.name}
          stat={stat}
          pokemon={pokemon}
          setPokemon={setPokemon}
        />
      ))}
    </div>
  );
};
