import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import calcDefendType from '@/utils/calcDefendType';
import { useEffect } from 'react';
import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';
import { TypeBadge } from '../TypeBadge/TypeBadge';
import { PokemonType } from '@/types/common';

export const TypeCalcDefendResult = () => {
  const {
    defendResult,
    typeCalcOptions,
    setDefendResult,
    teraType,
    defendAbility,
  } = useTypeCalculatorStore();

  useEffect(() => {
    teraType
      ? setDefendResult(
          calcDefendType(teraType as PokemonType, null, defendAbility),
        )
      : setDefendResult(
          calcDefendType(typeCalcOptions[0], typeCalcOptions[1], defendAbility),
        );
  }, [typeCalcOptions, teraType, defendAbility]);

  if (defendResult) {
    return (
      <div className="flex flex-col gap-8 py-8">
        {Array.from(defendResult.entries()).map(([key, types]) => (
          <div key={key} className="flex flex-col gap-2">
            <div className="text-[16px] font-semibold">
              {key}x 피해 ({types.length})
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
