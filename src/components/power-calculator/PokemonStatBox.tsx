import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { PokemonStatInput } from './PokemonStatInput';

import { PokemonDetailProps } from '@/types/common';
import { StatDataProps } from '@/types/data';

export interface PokemonStatBoxProps {
  stats: StatDataProps[];
  pokemon: PokemonDetailProps;
  usage: 'attack' | 'defend';
}

export const PokemonStatBox = ({
  stats,
  usage,
  pokemon,
}: PokemonStatBoxProps) => {
  const { setAttackPokemon, setDefendPokemon } = usePowerCalculatorStore();
  const setPokemon = usage === 'attack' ? setAttackPokemon : setDefendPokemon;

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
