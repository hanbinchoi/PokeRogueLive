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

  if (
    !attackPokemonStats ||
    !defendPokemonStats ||
    !attackPokemon ||
    !defendPokemon ||
    !MoveDetail ||
    MoveDetail.damage_class.name === 'status'
  )
    return;

  if (MoveDetail?.damage_class.name === 'status')
    return (
      <div className="py-9 flex items-center justify-center flex-col h-full">
        <div className="text-2xl font-bold">
          <p>상태변화 기술은 데미지가 표시되지 않아요 😤</p>
        </div>
      </div>
    );

  return (
    <div className="py-9 flex items-center flex-col gap-3">
      <div className="text-xl flex gap-1">
        데미지
        <Tooltip text={'해당 기술로 10회 타격 시 데미지 계산 결과입니다.'} />
      </div>
      <div className="text-2xl font-bold flex gap-2">
        {damages.map((damage, i) => {
          if (damage / defendPokemonStats.hp > 0.66)
            return (
              <p key={i} className="text-red-30">
                {damage}
              </p>
            );
          if (damage / defendPokemonStats.hp > 0.33)
            return <p key={i}>{damage}</p>;
          return (
            <p key={i} className="text-blue-30">
              {damage}
            </p>
          );
        })}
      </div>
      <div className="text-center">
        {damageContext &&
          Object.entries(damageContext)
            .filter(([_, value]) => value !== null)
            .map(([key, value]) => (
              <div key={key} className="text-sm text-gray-50">
                {value}
              </div>
            ))}
      </div>
    </div>
  );
};
