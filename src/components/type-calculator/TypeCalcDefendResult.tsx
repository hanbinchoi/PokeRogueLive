'use client';

import { useEffect, useState } from 'react';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { TypeBadge } from '../common';

import { calcResultType, PokemonType } from '@/types/common';

import getDefendDamageMap from '@/utils/getDefendDamageMap';

/**
 * 방어 타입 계산 결과 컴포넌트
 *
 * - 선택한 포켓몬 타입, 테라 타입, 특성을 기반으로 방어 타입별 피해 계산 결과를 표시합니다.
 */
export const TypeCalcDefendResult = () => {
  const [result, setResult] = useState<calcResultType>();

  const { checkedDefendTypes, teraType, defendAbility } =
    useTypeCalculatorStore();

  useEffect(() => {
    // 테라타입 옵션이 체크 된 경우 테라타입을 기준으로 결과 표 생성
    if (teraType)
      setResult(getDefendDamageMap([teraType as PokemonType], defendAbility));
    else {
      setResult(getDefendDamageMap(checkedDefendTypes, defendAbility));
    }
  }, [checkedDefendTypes, teraType, defendAbility]);

  if (!result) return null;

  return (
    <div className="type-defend-result flex flex-col gap-8 py-8">
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
