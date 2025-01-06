import { useEffect, useState } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../TypeBadge';

import { calcResultType } from '@/types/common';
import getAttackDamageMap from '@/utils/getAttackDamageMap';

export const TypeCalcAttackResult = () => {
  const { checkedAttackOptions, attackAbility, attackMove } =
    useTypeCalculatorStore();

  const [result, setResult] = useState<calcResultType>();

  useEffect(() => {
    checkedAttackOptions?.length
      ? setResult(
          getAttackDamageMap(checkedAttackOptions, attackAbility, attackMove),
        )
      : setResult(null);
  }, [checkedAttackOptions, attackAbility, attackMove]);

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
