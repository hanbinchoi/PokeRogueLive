import { PokemonStatInput } from '../PokemonStatInput/PokemonStatInput';

import { PokemonDataProps, StatInfoProps } from '@/types/common';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

export interface PokemonStatBoxProps {
  stats: StatInfoProps[];
  pokemon: PokemonDataProps;
  usage: 'attack' | 'defend';
}

export const PokemonStatBox = ({
  stats,
  usage,
  pokemon,
}: PokemonStatBoxProps) => {
  const { setAttackPokemon, setDefendPokemon } = usePowerCalculatorStore();
  return (
    <div className="flex flex-col gap-2 justify-center">
      {stats.map((stat, i) => {
        if (stat)
          return (
            <PokemonStatInput
              key={i}
              label={stat.stat.name}
              stat={stat}
              pokemon={pokemon}
              setPokemon={
                usage === 'attack' ? setAttackPokemon : setDefendPokemon
              }
            />
          );
      })}
    </div>
  );
};
