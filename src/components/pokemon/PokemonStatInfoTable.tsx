import { twJoin } from 'tailwind-merge';

import {
  DefaultProps,
  InfoKey,
  PokemonDetailProps,
  StatKey,
} from '@/types/common';

import getPokemonInfoMap from '@/utils/getPokemonInfoMap';
import getPokemonStatMap from '@/utils/getPokemonStatMap';

import {
  POKEMON_INFO_KOREAN_MAP,
  POKEMON_STAT_KOREAN_MAP,
} from '@/constants/contents';

export interface PokemonStatInfoTableProps extends DefaultProps {
  pokemon: PokemonDetailProps;
}

/**
 * 포켓몬 기본 정보와 능력치를 테이블로 보여주는 컴포넌트.
 *
 * 포켓몬 기본 정보와 능력치를 테이블로 표시합니다.
 * @param pokemon 포켓몬 상세 정보 (`PokemonDetailProps`)
 * @param className 추가 디자인 설정을 위한 class
 */
export const PokemonStatInfoTable = ({
  pokemon,
  className,
}: PokemonStatInfoTableProps) => {
  const stats = getPokemonStatMap(pokemon);
  const infos = getPokemonInfoMap(pokemon);
  return (
    <div className={twJoin('text-xs min-[480px]:text-base', className)}>
      <div className="w-full flex flex-col justify-center min-[480px]:grid grid-cols-2 gap-4 bg-white-100">
        <table className="table-auto text-left border border-gray-100 rounded-lg">
          <thead className="font-bold text-sm text-black-10 bg-gray-50">
            <tr>
              <th className="px-4 py-2">속성</th>
              <th className="px-4 py-2">값</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(infos).map(([info, value]) => (
              <tr className="border-b" key={info}>
                <td className="px-4 py-2 font-semibold ">
                  {POKEMON_INFO_KOREAN_MAP[info as InfoKey]}
                </td>
                <td className="px-4 py-2">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <table className="table-auto text-left border border-gray-100 rounded-lg">
          <thead className="font-bold text-sm text-black-10 bg-gray-50">
            <tr>
              <th className="px-4 py-2">스탯</th>
              <th className="px-4 py-2">값</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(stats).map(
              ([stat, value]) =>
                stat !== 'lv' && (
                  <tr className="border-b" key={stat}>
                    <td className="px-4 py-2 font-semibold">
                      {POKEMON_STAT_KOREAN_MAP[stat as StatKey]}
                    </td>
                    <td className="px-4 py-2">{value}</td>
                  </tr>
                ),
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
