import { PokemonDetailProps, PokemonStatsProps } from '@/types/common';

/**
 * 포켓몬의 상세 정보를 기반으로 스탯을 매핑하여 반환하는 함수
 *
 * @param pokemon - 포켓몬의 상세 정보를 담은 객체 (`PokemonDetailProps`)
 * @returns 포켓몬의 스탯 정보를 담은 객체 (`PokemonStatsProps`)
 */
export default function getPokemonStatMap(
  pokemon: PokemonDetailProps,
): PokemonStatsProps {
  // 초기 스탯 값 설정: lv(레벨)는 50으로 기본 설정
  const initialStats: PokemonStatsProps = {
    lv: 50,
    hp: 0,
    attack: 0,
    defense: 0,
    'special-attack': 0,
    'special-defense': 0,
    speed: 0,
  };

  // `pokemon.stats` 배열의 각 항목을 순회하며 스탯 값을 매핑
  pokemon.stats.forEach(({ base_stat, stat }) => {
    const statName = stat.name as keyof Omit<PokemonStatsProps, 'lv'>;

    if (statName in initialStats) {
      initialStats[statName] = base_stat;
    }
  });

  // 매핑된 스탯 정보를 반환
  return initialStats;
}
