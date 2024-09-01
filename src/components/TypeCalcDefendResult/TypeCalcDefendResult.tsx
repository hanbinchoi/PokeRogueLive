import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import calcDefendType from '@/utils/calcDefendType';
import { useEffect } from 'react';
import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';

export const TypeCalcDefendResult = () => {
  const { defendResult, typeCalcOptions, setDefendResult } =
    useTypeCalculatorStore();

  useEffect(() => {
    setDefendResult(calcDefendType(typeCalcOptions[0], typeCalcOptions[1]));
  }, [typeCalcOptions]);
  console.log(defendResult);
  return <div className="flex flex-col gap-4"></div>;
};
