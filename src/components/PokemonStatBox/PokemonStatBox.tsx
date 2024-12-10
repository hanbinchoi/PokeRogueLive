import { StatInfoProps } from '@/types/common';
import { PokemonStatInput } from '../PokemonStatInput/PokemonStatInput';

export interface PokemonStatBoxProps {
  stats: StatInfoProps[];
}

export const PokemonStatBox = ({ stats }: PokemonStatBoxProps) => {
  return (
    <div className="flex flex-col gap-2 justify-center">
      {stats.map((stat, i) => (
        <PokemonStatInput key={i} stat={stat} />
      ))}
    </div>
  );
};
