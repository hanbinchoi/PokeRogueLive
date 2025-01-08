import { CommonSelect } from '../common';
import { PokemonTypeSelector } from './PokemonTypeSelector';
import { TypeCalcDefendResult } from './TypeCalcDefendResult';

import {
  EXCLUDED_TYPES,
  POKEMON_TYPE_INFO,
  PokemonTypeName,
  SpecialDefendAbility,
} from '@/constants/contents';

/**
 * 타입 계산기 - 방어 모드를 위한 컴포넌트
 *
 * 포켓몬 타입, 특성을 선택하고 결과를 확인할 수 있도록 구성된 UI를 제공합니다.
 */
export const DefendTypeCalc = () => {
  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        {TYPE_SELECTION_OPTIONS.map((option) => (
          <PokemonTypeSelector
            key={option.index}
            title={option.title}
            index={option.index}
          />
        ))}

        <CommonSelect
          label="특성"
          options={Object.values(SpecialDefendAbility)}
          usage="ability"
        />
        <CommonSelect
          label="테라 타입"
          options={getTerraTypeOptions()}
          usage="teraType"
        />
      </div>
      <TypeCalcDefendResult />
    </div>
  );
};

const TYPE_SELECTION_OPTIONS = [
  { title: '첫번째', index: 0 },
  { title: '두번째', index: 1 },
];

/** 테라 타입 옵션 필터링 함수 */
const getTerraTypeOptions = () =>
  Object.values(PokemonTypeName)
    .filter((type) => !EXCLUDED_TYPES.has(type))
    .map((type) => POKEMON_TYPE_INFO[type].name);
