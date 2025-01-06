import { useEffect, useState } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../TypeBadge';

import { calcResultType, PokemonType } from '@/types/common';

import getDefendDamageMap from '@/utils/getDefendDamageMap';

export const TypeCalcDefendResult = () => {
  const [result, setResult] = useState<calcResultType>();

  const { checkedDefendOptions, teraType, defendAbility } =
    useTypeCalculatorStore();

  useEffect(() => {
    if (teraType)
      setResult(getDefendDamageMap([teraType as PokemonType], defendAbility));
    else {
      const defendTypes = [
        checkedDefendOptions[0],
        checkedDefendOptions[1],
      ].filter((type) => type !== null);

      setResult(getDefendDamageMap(defendTypes, defendAbility));
    }
  }, [checkedDefendOptions, teraType, defendAbility]);

  if (!result) return null;

  return (
    <div className="flex flex-col gap-8 py-8">
      {Array.from(result.entries()).map(([key, types]) => (
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
