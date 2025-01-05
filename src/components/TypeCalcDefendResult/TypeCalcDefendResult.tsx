import { useEffect } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../TypeBadge/TypeBadge';

import { PokemonType } from '@/types/common';
import getDefendDamageMap from '@/utils/getDefendDamageMap';

export const TypeCalcDefendResult = () => {
  const {
    defendResult,
    typeCalcDefendOptions,
    setDefendResult,
    teraType,
    defendAbility,
  } = useTypeCalculatorStore();

  useEffect(() => {
    if (teraType)
      setDefendResult(
        getDefendDamageMap([teraType as PokemonType], defendAbility),
      );
    else {
      const defendTypes = [
        typeCalcDefendOptions[0],
        typeCalcDefendOptions[1],
      ].filter((type) => type !== null);

      setDefendResult(getDefendDamageMap(defendTypes, defendAbility));
    }
  }, [typeCalcDefendOptions, teraType, defendAbility]);

  if (!defendResult) return null;

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
};
