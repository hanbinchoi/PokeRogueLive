import { TypeCalcOption } from './TypeCalcOption';
import { CommonSelect } from '../common';
import { TypeCalcDefendResult } from './TypeCalcDefendResult';

import {
  EXCLUDED_TYPES,
  POKEMON_TYPE_INFO,
  PokemonTypeName,
  SpecialDefendAbility,
} from '@/constants/contents';

export const TypeCalcDefend = () => {
  const options = [
    { title: '첫번째', index: 0 },
    { title: '두번째', index: 1 },
  ];

  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        {options.map((option) => (
          <TypeCalcOption
            key={option.index}
            title={option.title}
            index={option.index}
          />
        ))}

        <CommonSelect
          label="특성"
          options={Object.values(SpecialDefendAbility)}
        />
        <CommonSelect
          label="테라 타입"
          options={Object.values(PokemonTypeName)
            .filter((type) => !EXCLUDED_TYPES.has(type))
            .map((type) => POKEMON_TYPE_INFO[type].name)}
        />
      </div>
      <TypeCalcDefendResult />
    </div>
  );
};
