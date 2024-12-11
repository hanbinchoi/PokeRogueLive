import { useState } from 'react';

import { PokemonStatsProps, StatKey } from '@/types/common';

import { POKEMON_STAT_KOREAN_MAP } from '@/constants/contents';

export interface PokemonStatInputProps {
  label: string;
  initialStat: number;
  pokemonStats: PokemonStatsProps | null;
  setPokemonStats: (pokemonStats: PokemonStatsProps | null) => void;
}

export const PokemonStatInput = ({
  label,
  initialStat,
  pokemonStats,
  setPokemonStats,
}: PokemonStatInputProps) => {
  const [stat, setStat] = useState(initialStat);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    const key = Object.keys(POKEMON_STAT_KOREAN_MAP).find(
      (k) => POKEMON_STAT_KOREAN_MAP[k as StatKey] === label,
    );

    if (key) {
      const newPokemonStats = { ...pokemonStats, [key]: value };

      setStat(value);
      setPokemonStats(newPokemonStats);
    }
  };

  return (
    <div className="flex items-center h-full">
      <div className="w-[72px] text-lg">{label}</div>
      <input
        type="number"
        className="border rounded p-2 h-[32px] w-[120px]"
        value={stat}
        onChange={handleInputChange}
        placeholder="포켓몬 입력"
      />
    </div>
  );
};
