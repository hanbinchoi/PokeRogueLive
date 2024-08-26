import { POKEMON_TYPE, TYPE_CALC_OPTION_TITLE } from '@/constants/contents';
import '../../styles/globals.css';

import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

export interface TypeCalcOptionProps {
  index: number;
}

export const TypeCalcOption = ({ index }: TypeCalcOptionProps) => {
  const typeCalcOptions = useTypeCalculatorStore(
    (state) => state.typeCalcOptions,
  );
  const checkedType = typeCalcOptions[index];
  console.log(typeCalcOptions);
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-semibold">
        {TYPE_CALC_OPTION_TITLE[index]}
      </p>
      <div className="flex gap-x-2 gap-y-4 flex-wrap">
        {POKEMON_TYPE.map((type) =>
          type === 'stellar' || type === 'unknown' ? null : (
            <TypeCalcButton
              key={type}
              type={type}
              index={index}
              checked={checkedType === type}
            />
          ),
        )}
      </div>
    </div>
  );
};
