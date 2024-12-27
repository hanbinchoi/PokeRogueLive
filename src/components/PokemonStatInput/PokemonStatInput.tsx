import { PokemonDataProps, StatInfoProps, StatKey } from '@/types/common';

import { POKEMON_STAT_KOREAN_MAP } from '@/constants/contents';

export interface PokemonStatInputProps {
  stat: StatInfoProps;
  pokemon: PokemonDataProps;
  setPokemon: (pokemon: PokemonDataProps) => void;
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
    <div className="flex items-center h-full">
      <div className="w-[72px] text-lg">{koreanLabel}</div>
      <input
        type="number"
        className="border rounded p-2 h-[32px] w-[120px]"
        value={stat.base_stat}
        onChange={handleInputChange}
        placeholder="포켓몬 입력"
        autoComplete="off"
      />
    </div>
  );
};
