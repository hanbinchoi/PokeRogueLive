import { useQuery } from '@tanstack/react-query';

import { getPokemonAbilityInfo } from '@/api/pokemon';

import { AbilityInfoProps } from '@/types/common';

import getAbilityNameInKorean from '@/utils/getAbilityNameInKorean';
import getAbilityDescInKorean from '@/utils/getAbilityDescInKorean';

export interface AbilityProps {
  ability: AbilityInfoProps;
  id: number | null;
  hidden: Boolean;
}

export const Ability = ({ ability, id, hidden }: AbilityProps) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['ability', id],
    queryFn: () => getPokemonAbilityInfo(ability.ability.url),
  });

  if (isLoading) return <div>ability loading...</div>;
  if (isError) return <div>ability error...</div>;

  if (data)
    return (
      <div className="flex flex-col gap-2">
        <div
          className={
            hidden
              ? 'bg-yellow-100 text-white-100  px-2 py-1 rounded-lg text-[16px] w-fit '
              : 'bg-gray-50 text-white-100 px-2 py-1 rounded-lg text-[16px] w-fit'
          }>
          <p>{getAbilityNameInKorean(data.names)}</p>
        </div>
        <p>{getAbilityDescInKorean(data.flavor_text_entries)}</p>
      </div>
    );
};
