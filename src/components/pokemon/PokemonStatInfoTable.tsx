import { twJoin } from 'tailwind-merge';

import { DefaultProps, PokemonDetailProps } from '@/types/common';

export interface PokemonStatInfoTableProps extends DefaultProps {
  pokemon: PokemonDetailProps;
}

export const PokemonStatInfoTable = ({
  pokemon,
  className,
}: PokemonStatInfoTableProps) => {
  return (
    <div className={twJoin('text-xs min-[480px]:text-base', className)}>
      <div className="w-full flex flex-col justify-center min-[480px]:grid grid-cols-2 gap-4 bg-white-100">
        <table className="table-auto text-left border border-gray-100 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-bold text-sm text-black-10">
                속성
              </th>
              <th className="px-4 py-2 font-bold text-sm text-black-10">값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">분류</td>
              <td className="px-4 py-2">{pokemon.genera}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">키</td>
              <td className="px-4 py-2">{pokemon.height / 10}m</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">몸무게</td>
              <td className="px-4 py-2">{pokemon.weight / 10}kg</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">
                획득 경험치
              </td>
              <td className="px-4 py-2">{pokemon.base_experience}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">포획률</td>
              <td className="px-4 py-2">{pokemon.capture_rate}</td>
            </tr>
          </tbody>
        </table>
        <table className="table-auto text-left border border-gray-100 rounded-lg">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 font-bold text-sm text-black-10">
                스탯
              </th>
              <th className="px-4 py-2 font-bold text-sm text-black-10">값</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">HP</td>
              <td className="px-4 py-2">{pokemon.stats[0].base_stat}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">공격</td>
              <td className="px-4 py-2">{pokemon.stats[1].base_stat}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">방어</td>
              <td className="px-4 py-2">{pokemon.stats[2].base_stat}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">
                특수공격
              </td>
              <td className="px-4 py-2">{pokemon.stats[3].base_stat}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">
                특수방어
              </td>
              <td className="px-4 py-2">{pokemon.stats[4].base_stat}</td>
            </tr>
            <tr className="border-b">
              <td className="px-4 py-2 font-semibold text-black-30">스피드</td>
              <td className="px-4 py-2">{pokemon.stats[5].base_stat}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 font-semibold text-black-30">합계</td>
              <td className="px-4 py-2">
                {pokemon.stats.reduce(
                  (total, stat) => total + stat.base_stat,
                  0,
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
