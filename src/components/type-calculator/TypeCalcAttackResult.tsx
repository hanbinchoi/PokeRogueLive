import { useEffect, useState } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../common';

import { calcResultType } from '@/types/common';

import getAttackDamageMap from '@/utils/getAttackDamageMap';

/**
 * 공격 타입 계산 결과 컴포넌트
 *
 * - 선택한 포켓몬 타입, 특성, 기술을 기반으로 공격 타입별 데미지 계산 결과를 표시합니다.
 */
export const TypeCalcAttackResult = () => {
  const { checkedAttackTypes, attackAbility, attackMove } =
    useTypeCalculatorStore();

  const [result, setResult] = useState<calcResultType>();

  useEffect(() => {
    setResult(
      getAttackDamageMap(checkedAttackTypes, attackAbility, attackMove),
    );
  }, [checkedAttackTypes, attackAbility, attackMove]);

  if (!result) return null;

  return (
    <div className="type-attack-result flex flex-col gap-8 py-6 sm:py-8">
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
  );
};
