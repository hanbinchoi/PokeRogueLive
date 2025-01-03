import { useQuery } from '@tanstack/react-query';

import { getPokemonAbilityInfo } from '@/api/pokemon';

import { AbilityDataProps } from '@/types/data';

import getAbilityNameInKorean from '@/utils/getAbilityNameInKorean';
import getAbilityDescInKorean from '@/utils/getAbilityDescInKorean';

export interface AbilityProps {
  ability: AbilityDataProps;
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
              ? 'bg-yellow-100 text-white-100  px-2 py-1 rounded-md sm:rounded-lg w-fit '
              : 'bg-gray-50 text-white-100 px-2 py-1 rounded-md sm:rounded-lg w-fit'
          }>
          <p className="text-xs md:text-sm">
            {getAbilityNameInKorean(data.names)}
          </p>
        </div>
        <p className="text-xs md:text-sm">
          {getAbilityDescInKorean(data.flavor_text_entries)}
        </p>
      </div>
    );
};
