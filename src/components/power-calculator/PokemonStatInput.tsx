import { PokemonDetailProps, StatKey } from '@/types/common';
import { StatDataProps } from '@/types/data';

import { POKEMON_STAT_KOREAN_MAP } from '@/constants/contents';

export interface PokemonStatInputProps {
  stat: StatDataProps;
  pokemon: PokemonDetailProps;
  setPokemon: (pokemon: PokemonDetailProps) => void;
}

/**
 * 포켓몬 스탯 입력 필드 컴포넌트.
 *
 * 특정 스탯 값을 입력받아 포켓몬의 스탯 데이터를 업데이트합니다.
 *
 * @param stat - 개별 스탯 데이터 (`StatDataProps`)
 * @param pokemon - 포켓몬 상세 정보 (`PokemonDetailProps`)
 * @param setPokemon - 포켓몬 정보를 업데이트하는 함수
 */
export const PokemonStatInput = ({
  stat,
  pokemon,
  setPokemon,
}: PokemonStatInputProps) => {
  /**
   * 입력 필드 변경 핸들러.
   * 스탯 값을 업데이트하고 부모 컴포넌트의 상태를 갱신합니다.
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    // 현재 입력 된 필드의 value만 변경
    const updatedStats = pokemon.stats.map((s) =>
      s.stat.name === stat.stat.name ? { ...s, base_stat: +value } : s,
    );
    return setPokemon({ ...pokemon, stats: updatedStats });
  };

  return (
    <div className="flex items-center min-w-[80px] lg:min-w-[70px] ">
      <div className="w-full text-base md:text-lg lg:text-md">
        {POKEMON_STAT_KOREAN_MAP[stat.stat.name as StatKey]}
      </div>
      <input
        type="text"
        className="pokemon-stat-input w-full min-w-[43px] max-w-[158px] border rounded py-1 px-2 text-sm lg:text-md"
        value={stat.base_stat}
        onChange={handleInputChange}
        placeholder={POKEMON_STAT_KOREAN_MAP[stat.stat.name as StatKey]}
        autoComplete="off"
      />
    </div>
  );
};
