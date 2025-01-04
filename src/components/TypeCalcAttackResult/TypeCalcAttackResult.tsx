import { useEffect, useState } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../TypeBadge/TypeBadge';

import { calcResultType } from '@/types/common';

import getAttackDamageMapByTypes from '@/utils/getAttackDamageMapByTypes';

export const TypeCalcAttackResult = () => {
  const { typeCalcAttackOptions, attackAbility, attackMove } =
    useTypeCalculatorStore();

  const [result, setResult] = useState<calcResultType>();

  useEffect(() => {
    typeCalcAttackOptions?.length
      ? setResult(
          getAttackDamageMapByTypes(
            typeCalcAttackOptions,
            attackAbility,
            attackMove,
          ),
        )
      : setResult(null);
  }, [typeCalcAttackOptions, attackAbility, attackMove]);

  return (
    result && (
      <div className="flex flex-col gap-8 py-6 sm:py-8">
        {Array.from(result.entries()).map(([key, types]) => (
          <div key={key} className="flex flex-col gap-2">
            <div className="text-sm sm:text-md md:text-base font-semibold">
              {key}x 데미지 ({types.length})
            </div>
            <div className="flex gap-2 flex-wrap">
              {types.map((type) => (
                <TypeBadge key={type} type={type} size="medium" />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  );
};
