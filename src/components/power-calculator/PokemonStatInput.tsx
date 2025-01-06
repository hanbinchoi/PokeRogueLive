import { PokemonDetailProps, StatKey } from '@/types/common';
import { StatDataProps } from '@/types/data';

import { POKEMON_STAT_KOREAN_MAP } from '@/constants/contents';

export interface PokemonStatInputProps {
  stat: StatDataProps;
  pokemon: PokemonDetailProps;
  setPokemon: (pokemon: PokemonDetailProps) => void;
}

export const PokemonStatInput = ({
  stat,
  pokemon,
  setPokemon,
}: PokemonStatInputProps) => {
  const koreanLabel = POKEMON_STAT_KOREAN_MAP[stat.stat.name as StatKey];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const updatedStats = pokemon.stats.map((s) =>
      s.stat.name === stat.stat.name ? { ...s, base_stat: value } : s,
    );
    setPokemon({ ...pokemon, stats: updatedStats });
  };

  return (
    <div className="flex items-center min-w-[80px] lg:min-w-[70px] ">
      <div className="w-full text-base md:text-lg lg:text-md">
        {koreanLabel}
      </div>
      <input
        type="number"
        className="w-full min-w-[43px] max-w-[158px] border rounded py-1 px-2 text-sm lg:text-md"
        value={stat.base_stat}
        onChange={handleInputChange}
        placeholder="포켓몬 입력"
        autoComplete="off"
      />
    </div>
  );
};
