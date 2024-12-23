import { useEffect, useState } from 'react';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { Tooltip } from '../Tooltip/Tooltip';
import { PowerDamageContext } from '../PowerDamageContext/PowerDamageContext';
import { PowerDamageValue } from '../PowerDamageValue/PowerDamageValue';
import { PowerDamageStatusResult } from '../PowerDamageStatusResult/PowerDamageStatusResult';

import { DamageContextProps } from '@/types/common';

import calcPower from '@/utils/calcPower';
import { getPokemonStatMap } from '@/utils/getPokemonStatMap';

interface PowerDamageProps {
  moveUrl: string;
}
export const PowerDamage = ({ moveUrl }: PowerDamageProps) => {
  const {
    attackPokemon,
    defendPokemon,
    weather,
    field,
    isWeaknessHit,
    damages,
    setDamages,
  } = usePowerCalculatorStore();
  const [damageContext, setDamageContext] = useState<DamageContextProps>();

  const { data: MoveDetail, isLoading, isError } = usePokemonMoveQuery(moveUrl);

  useEffect(() => {
    if (
      !attackPokemon ||
      !defendPokemon ||
      !MoveDetail ||
      MoveDetail.damage_class.name === 'status'
    )
      return;

    const attackPokemonStats = getPokemonStatMap(attackPokemon);
    const defendPokemonStats = getPokemonStatMap(defendPokemon);

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
    return <PowerDamageStatusResult />;

  return (
    <div className="py-9 flex items-center flex-col gap-3">
      <div className="text-xl flex gap-1">
        데미지
        <Tooltip text={'해당 기술로 10회 타격 시 데미지 계산 결과입니다.'} />
      </div>
      <div className="text-2xl font-bold flex gap-2">
        {damages.map((damage, i) => (
          <PowerDamageValue
            key={i}
            damage={damage}
            hp={
              defendPokemon?.stats.find((stat) => stat.stat.name === 'hp')
                ?.base_stat
            }
          />
        ))}
      </div>
      <PowerDamageContext damageContext={damageContext} />
    </div>
  );
};
