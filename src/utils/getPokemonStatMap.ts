import { PokemonDetailProps, PokemonStatsProps } from '@/types/common';

export default function getPokemonStatMap(
  pokemon: PokemonDetailProps,
): PokemonStatsProps {
  const initialStats: PokemonStatsProps = {
    lv: 50, // 기본 레벨
    hp: 0,
    attack: 0,
    defense: 0,
    'special-attack': 0,
    'special-defense': 0,
    speed: 0,
  };

  // stat.stat.name을 기준으로 매핑
  pokemon.stats.forEach(({ base_stat, stat }) => {
    const statName = stat.name as keyof Omit<PokemonStatsProps, 'lv'>;
    if (statName in initialStats) {
      initialStats[statName] = base_stat;
    }
  });

  return initialStats;
}
