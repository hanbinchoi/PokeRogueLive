import { twJoin } from 'tailwind-merge';

import {
  DefaultProps,
  InfoKey,
  PokemonDetailProps,
  StatKey,
} from '@/types/common';

import getPokemonStatMap from '@/utils/getPokemonStatMap';
import getPokemonInfoMap from '@/utils/getPokemonInfoMap';

import {
  POKEMON_INFO_KOREAN_MAP,
  POKEMON_STAT_KOREAN_MAP,
} from '@/constants/contents';

export interface PokemonStatInfoProps extends DefaultProps {
  pokemon: PokemonDetailProps;
}

/**
 * 포켓몬 능력치 정보 컴포넌트.
 *
 * 포켓몬 능력치 및 기본 스탯을 표시합니다.
 * @param pokemon 포켓몬 기본 정보 (`PokemonDetailProps`)
 * @param className 추가 디자인 설정을 위한 class
 */
export const PokemonStatInfo = ({
  pokemon,
  className,
}: PokemonStatInfoProps) => {
  const stats = getPokemonStatMap(pokemon);
  const infos = getPokemonInfoMap(pokemon);

  return (
    <div
      className={twJoin(
        'flex flex-col gap-5 text-xs min-[480px]:text-base ',
        className,
      )}>
      <div className="flex justify-between mt-2">
        {Object.entries(infos).map(([info, value]) => (
          <div className="flex flex-col gap-1" key={info}>
            <span className="font-bold">
              {POKEMON_INFO_KOREAN_MAP[info as InfoKey]}
            </span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        {Object.entries(stats).map(
          ([stat, value]) =>
            stat !== 'lv' && (
              <div className="flex flex-col gap-1" key={stat}>
                <span className="font-bold">
                  {POKEMON_STAT_KOREAN_MAP[stat as StatKey]}
                </span>
                <span>{value}</span>
              </div>
            ),
        )}

        <div className="flex flex-col gap-1">
          <span className="font-bold">합계</span>
          <span>
            {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
          </span>
        </div>
      </div>
    </div>
  );
};
