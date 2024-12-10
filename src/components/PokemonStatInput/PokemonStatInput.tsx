import { StatInfoProps } from '@/types/common';

export interface PokemonStatInputProps {
  stat: StatInfoProps;
}

export const PokemonStatInput = ({ stat }: PokemonStatInputProps) => {
  return (
    <div className="flex items-center h-full">
      <div className="w-[72px] text-lg">
        {POKEMON_STAT_KOREAN_MAP[stat.stat.name as StatKey]}
      </div>
      <input
        type="text"
        className="border rounded p-2 h-[32px]"
        value={stat.base_stat}
        placeholder="포켓몬 입력"
      />
    </div>
  );
};

type StatKey =
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

const POKEMON_STAT_KOREAN_MAP = {
  hp: 'HP',
  attack: '공격',
  defense: '방어',
  'special-attack': '특수공격',
  'special-defense': '특수방어',
  speed: '스피드',
};
