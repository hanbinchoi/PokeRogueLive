import { useEffect, useMemo, useState } from 'react';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { Tooltip } from '../common';
import { PowerDamageStatusResult } from './PowerDamageStatusResult';
import { PowerDamageValue } from './PowerDamageValue';
import { PowerDamageContext } from './PowerDamageContext';

import { DamageContextProps } from '@/types/common';

import getDamages from '@/utils/getDamages';

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

  const hpStat = defendPokemon?.stats.find(
    (stat) => stat.stat.name === 'hp',
  )?.base_stat;

  const damageCalculation = useMemo(() => {
    if (!attackPokemon || !defendPokemon || !MoveDetail) return null;

    return getDamages({
      attackPokemon,
      defendPokemon,
      MoveDetail,
      weather,
      field,
      isWeaknessHit,
    });
  }, [attackPokemon, defendPokemon, MoveDetail, weather, field, isWeaknessHit]);

  useEffect(() => {
    if (damageCalculation) {
      setDamages(damageCalculation.newDamages);
      setDamageContext(damageCalculation.damageContext);
    }
  }, [damageCalculation]);

  if (isLoading) return <div>로딩 중...</div>;

  if (isError) return <div>데이터 오류 발생</div>;
  console.log(MoveDetail);
  if (MoveDetail?.damage_class.name === 'status')
    return <PowerDamageStatusResult />;

  return (
    <div className="py-9 flex items-center flex-col gap-3">
      <div className="text-base lg:text-xl font-bold flex gap-1">
        데미지
        <Tooltip text={'해당 기술로 10회 타격 시 데미지 계산 결과입니다.'} />
      </div>
      <div className="text-base md:text-lg lg:text-2xl font-bold grid grid-cols-5 sm:grid-cols-10 gap-x-2">
        {damages.map((damage, i) => (
          <PowerDamageValue key={i} damage={damage} hp={hpStat} />
        ))}
      </div>
      <PowerDamageContext damageContext={damageContext} />
    </div>
  );
};
