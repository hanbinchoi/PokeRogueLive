import { useEffect, useState } from 'react';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { Tooltip } from '../Tooltip/Tooltip';

import { damageContextProps } from '@/types/common';

import calcPower from '@/utils/calcPower';

interface PowerDamageProps {
  moveUrl: string;
}
export const PowerDamage = ({ moveUrl }: PowerDamageProps) => {
  const {
    attackPokemon,
    defendPokemon,
    attackPokemonStats,
    defendPokemonStats,
    weather,
    field,
    isWeaknessHit,
    damages,
    setDamages,
  } = usePowerCalculatorStore();
  const [damageContext, setDamageContext] = useState<damageContextProps>();

  const { data: MoveDetail, isLoading, isError } = usePokemonMoveQuery(moveUrl);

  useEffect(() => {
    if (
      !attackPokemonStats ||
      !defendPokemonStats ||
      !attackPokemon ||
      !defendPokemon ||
      !MoveDetail ||
      MoveDetail.damage_class.name === 'status'
    )
      return;

    const { newDamages, damageContext: newDamageContext } = calcPower({
      attackPokemon,
      defendPokemon,
      attackPokemonStats,
      defendPokemonStats,
      MoveDetail,
      weather,
      field,
      isWeaknessHit,
    });
    setDamages(newDamages);
    setDamageContext(newDamageContext);
  }, [MoveDetail, attackPokemon, defendPokemon, weather, field, isWeaknessHit]);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) return <div>데이터 오류 발생</div>;

  if (MoveDetail?.damage_class.name === 'status')
    return (
      <div className="py-9 flex items-center justify-center flex-col h-full">
        <div className="text-2xl font-bold">
          <p>상태변화 기술은 데미지가 표시되지 않아요 😤</p>
        </div>
      </div>
    );

  return (
    <div className="py-9 flex items-center flex-col gap-2">
      <div className="text-xl mb-2 flex gap-1">
        데미지
        <Tooltip text={'해당 기술로 10회 타격 시 데미지 계산 결과입니다.'} />
      </div>
      <div className="text-2xl font-bold">{damages.join(', ')}</div>
      <div className="text-center">
        {damageContext &&
          Object.entries(damageContext)
            .filter(([_, value]) => value !== null) // null이 아닌 값만 필터링
            .map(([key, value]) => (
              <div key={key} className="text-sm text-gray-50">
                {value}
              </div> // 각 메시지를 div로 감싸서 출력
            ))}
      </div>
    </div>
  );
};
