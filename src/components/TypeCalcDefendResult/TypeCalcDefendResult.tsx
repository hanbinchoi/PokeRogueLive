import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import calcDefendType from '@/utils/calcDefendType';
import { useEffect } from 'react';
import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';
import { TypeBadge } from '../TypeBadge/TypeBadge';

export const TypeCalcDefendResult = () => {
  const { defendResult, typeCalcOptions, setDefendResult } =
    useTypeCalculatorStore();

  useEffect(() => {
    setDefendResult(calcDefendType(typeCalcOptions[0], typeCalcOptions[1]));
  }, [typeCalcOptions]);

  defendResult?.forEach((value, key) => {
    console.log(key);
  });
  if (defendResult) {
    return (
      <div className="flex flex-col gap-8 py-8">
        {Array.from(defendResult.entries()).map(([key, types]) => (
          <div className="flex flex-col gap-2">
            <div className="text-[16px] font-semibold" key={key}>
              {key}x 피해
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <TypeBadge key={type} type={type} size="medium" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
};
