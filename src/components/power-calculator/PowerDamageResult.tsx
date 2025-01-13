import { useEffect, useMemo, useState } from 'react';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { ErrorComponent, LoadingComponent, Tooltip } from '../common';
import { PowerDamageValue } from './PowerDamageValue';
import { PowerDamageContext } from './PowerDamageContext';

import { DamageContextProps } from '@/types/common';

import getDamages from '@/utils/getDamages';

/**
 * 데미지 계산 결과를 보여주는 컴포넌트
 *
 * - 기술, 포켓몬 정보, 환경(날씨, 필드 등)을 기반으로 데미지를 계산하여 화면에 출력합니다.
 * - 상태 기술인 경우 별도의 결과 컴포넌트를 렌더링합니다.
 * - 데미지 계산 로직(약점타격, 속성보정 등)을 함께 안내합니다.
 */
export const PowerDamageResult = () => {
  const {
    attackPokemon,
    defendPokemon,
    weather,
    field,
    isWeaknessHit,
    damages,
    setDamages,
    move,
  } = usePowerCalculatorStore();
  const [damageContext, setDamageContext] = useState<DamageContextProps>();

  // store에 move정보는 url과 이름만 저장되어 있기 때문에 이를 활용해서 기술의 상세 정보를 가져오는 과정
  const {
    data: MoveDetail,
    isLoading,
    isError,
  } = usePokemonMoveQuery(move?.move.url);

  // 방어 포켓몬의 HP
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

  // 데미지 계산 결과 값이 바뀌면 상태를 새롭게 update
  useEffect(() => {
    if (damageCalculation) {
      setDamages(damageCalculation.newDamages);
      setDamageContext(damageCalculation.damageContext);
    }
  }, [damageCalculation]);

  if (!defendPokemon || !damages.length) return null;

  if (isLoading) return <LoadingComponent />;

  if (isError)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ErrorComponent
          size="small"
          message="포켓몬 기술 정보를 불러올 수 없어요"
        />
      </div>
    );

  if (MoveDetail?.damage_class.name === 'status')
    return (
      <div className="w-full h-full flex justify-center items-center">
        <ErrorComponent
          size="xsmall"
          message="상태변화 기술은 표시되지 않아요"
        />
      </div>
    );

  if (damages.length)
    return (
      <div className="damage-result py-9 flex items-center flex-col gap-3">
        <div className="text-base lg:text-xl font-bold flex gap-1">
          데미지
          <Tooltip text={'해당 기술로 10회 타격 시 데미지 계산 결과입니다.'} />
        </div>
        <div className="text-base md:text-lg lg:text-2xl font-bold grid grid-cols-5 sm:grid-cols-10 gap-x-2">
          {damages.map((damage, i) => (
            <PowerDamageValue key={i} damage={damage} hp={Number(hpStat)} />
          ))}
        </div>
        <PowerDamageContext damageContext={damageContext} />
      </div>
    );
};
