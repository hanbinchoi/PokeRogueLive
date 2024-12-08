import { Ability } from '../Ability/Ability';
import { Tooltip } from '../Tooltip/Tooltip';

import { AbilityInfoProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

export interface AbilityBoxProps {
  abilities: AbilityInfoProps[];
}

export const AbilityBox = ({ abilities }: AbilityBoxProps) => {
  console.log(abilities);
  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex gap-1">
        <p className="text-xl font-bold">특성</p>
        <Tooltip text={'숨겨진 특성은 노란색으로 표기돼요'} />
      </div>
      {abilities.map((ability) => (
        <Ability
          key={extractIdFromUrl(ability.ability.url)}
          id={extractIdFromUrl(ability.ability.url)}
          ability={ability}
          hidden={ability.is_hidden}
        />
      ))}
    </div>
  );
};
