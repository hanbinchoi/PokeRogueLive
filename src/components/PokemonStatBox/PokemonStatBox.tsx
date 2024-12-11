import { useEffect } from 'react';

import { PokemonStatInput } from '../PokemonStatInput/PokemonStatInput';

import { PokemonStatsProps, StatInfoProps, StatKey } from '@/types/common';

import { POKEMON_STAT_KOREAN_MAP } from '@/constants/contents';

export interface PokemonStatBoxProps {
  stats: StatInfoProps[];
  pokemonStats: PokemonStatsProps | null;
  setPokemonStats: (pokemonStats: PokemonStatsProps | null) => void;
}

export const PokemonStatBox = ({
  stats,
  pokemonStats,
  setPokemonStats,
}: PokemonStatBoxProps) => {
  useEffect(() => {
    const updatedStat: PokemonStatsProps = { lv: 50 };

    stats.forEach(({ stat, base_stat }) => {
      updatedStat[stat.name as StatKey] = base_stat;
    });

    setPokemonStats(updatedStat);
  }, []);

  if (pokemonStats)
    return (
      <div className="flex flex-col gap-2 justify-center">
        {Object.entries(pokemonStats).map(([key, value]) => (
          <PokemonStatInput
            key={key}
            initialStat={value}
            label={POKEMON_STAT_KOREAN_MAP[key as StatKey]}
            pokemonStats={pokemonStats}
            setPokemonStats={setPokemonStats}
          />
        ))}
      </div>
    );
};
