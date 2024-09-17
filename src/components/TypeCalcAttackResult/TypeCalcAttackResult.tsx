import { useEffect, useState } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../TypeBadge/TypeBadge';

import { PokemonType } from '@/types/common';

import calcAttackType from '@/utils/calcAttackType';

export const TypeCalcAttackResult = () => {
  const { typeCalcAttackOptions, attackAbility, attackMove } =
    useTypeCalculatorStore();

  const [result, setResult] = useState<Map<string, PokemonType[]> | null>();
  useEffect(() => {
    setResult(calcAttackType(typeCalcAttackOptions, attackAbility, attackMove));
  }, [typeCalcAttackOptions, attackAbility, attackMove]);

  return (
    result && (
      <div className="flex flex-col gap-8 py-8">
        {Array.from(result.entries()).map(([key, types]) => (
          <div key={key} className="flex flex-col gap-2">
            <div className="text-[16px] font-semibold">
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
