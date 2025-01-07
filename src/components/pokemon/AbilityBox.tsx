import { Tooltip } from '../common/Tooltip';
import { Ability } from './Ability';

import { AbilityDataProps } from '@/types/data';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

export interface AbilityBoxProps {
  abilities: AbilityDataProps[];
}

/**
 * 포켓몬 특성 정보를 표시하는 컴포넌트.
 *
 * @param abilities 포켓몬 특성 목록 (`AbilityDataProps[]`)
 */
export const AbilityBox = ({ abilities }: AbilityBoxProps) => {
  return (
    <div className="flex flex-col gap-4 mb-8">
      <div className="flex gap-1 w-full">
        <p className="text-lg min-[480px]:text-xl font-bold ">특성</p>
        <Tooltip text={'숨겨진 특성은 노란색으로 표기돼요'} />
        <Tooltip
          text={
            "포켓몬api에서 제공되는 데이터 중 '한글'이 없는 데이터는 '영문'으로 표기됩니다."
          }
        />
      </div>
      {abilities.map((ability, i) => (
        <Ability
          key={i}
          id={extractIdFromUrl(ability.ability.url)}
          ability={ability}
          hidden={ability.is_hidden}
        />
      ))}
    </div>
  );
};
