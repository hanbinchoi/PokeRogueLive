import { useQuery } from '@tanstack/react-query';
import { twJoin } from 'tailwind-merge';

import { getPokemonAbilityInfo } from '@/api/pokemon';

import { ErrorComponent, LoadingComponent } from '../common';

import { AbilityDataProps } from '@/types/data';

import getAbilityNameInKorean from '@/utils/getAbilityNameInKorean';
import getAbilityDescInKorean from '@/utils/getAbilityDescInKorean';

export interface AbilityProps {
  ability: AbilityDataProps;
  id: number;
  hidden: boolean;
}

/**
 * 포켓몬의 특성을 보여주는 컴포넌트.
 *
 * - `ability`: 특성의 세부 정보 (`AbilityDataProps`)
 * - `id`: 포켓몬 ID (`number`)
 * - `hidden`: 특성이 숨겨진 특성인지 여부 (`boolean`)
 */
export const Ability = ({ ability, id, hidden }: AbilityProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ability', id],
    queryFn: () => getPokemonAbilityInfo(ability.ability.url),
  });

  if (isLoading) return <LoadingComponent />;
  if (isError)
    return <ErrorComponent message="특성을 불러올 수 없어요." size="small" />;

  if (data)
    return (
      <div className="flex flex-col gap-2">
        <div
          className={twJoin(
            'text-white-100 px-2 py-1 rounded-md sm:rounded-lg w-fit',
            hidden ? 'bg-yellow-100' : 'bg-gray-50',
          )}>
          <p className="text-xs md:text-sm">
            {getAbilityNameInKorean(data.names)}
          </p>
        </div>
        <p className="text-xs md:text-sm font-semibold">
          {getAbilityDescInKorean(data.flavor_text_entries)}
        </p>
      </div>
    );
};
