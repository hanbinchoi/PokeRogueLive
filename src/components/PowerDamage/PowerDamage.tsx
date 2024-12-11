import { useEffect, useState } from 'react';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';
import usePowerCalculatorStore from '@/stores/powerCalculatorStore';
import calcPower from '@/utils/calcPower';

interface PowerDamageProps {
  moveUrl: string;
}
export const PowerDamage = ({ moveUrl }: PowerDamageProps) => {
  const [damage, setDamage] = useState(0);
  const {
    attackPokemon,
    defendPokemon,
    attackPokemonStats,
    defendPokemonStats,
    weather,
    field,
    isWeaknessHit,
  } = usePowerCalculatorStore();

  // usePokemonMoveQuery 훅을 항상 호출하고, move가 없다면 빈 URL을 전달
  const { data: MoveDetail, isLoading, isError } = usePokemonMoveQuery(moveUrl);

  useEffect(() => {
    const calculatedDamage = calcPower(
      attackPokemon,
      defendPokemon,
      attackPokemonStats,
      defendPokemonStats,

      MoveDetail,
      weather,
      field,
      isWeaknessHit,
    );
    setDamage(calculatedDamage);
  }, [
    MoveDetail,
    attackPokemon,
    defendPokemon,
    attackPokemonStats,
    defendPokemonStats,
    weather,
    field,
    isWeaknessHit,
  ]);

  // 로딩 중일 때 처리
  if (isLoading) return <div>로딩 중...</div>;

  // 에러가 발생했을 때 처리
  if (isError) return <div>데이터 오류 발생</div>;

  return (
    <div className="py-9 flex items-center flex-col">
      <div className="text-2xl mb-2">데미지</div>
      <div className="text-4xl font-bold">{damage}</div>
    </div>
  );
};
