interface PowerDamageValueProps {
  damage: number;
  hp?: number;
}

/**
 * 기술의 위력과 방어 포켓몬의 HP를 기준으로 데미지 값을 시각적으로 표시하는 컴포넌트.
 *
 * 방어 포켓몬의 HP에 대한 기술의 위력 비율을 계산하여 색상을 다르게 표시합니다:
 * - 위력/HP 비율 0.66 초과 : 빨간색 (text-red-30)
 * - 위력/HP 비율 0.33 초과 : 회색 (text-gray-70)
 * - 위력/HP 비율 0.33 미만 : 파란색 (text-blue-30)
 *
 * @param damage - 기술의 위력 (`number`)
 * @param hp - 방어 포켓몬의 hp (`number` | `undefined`) - `undefined`일 경우 데미지는 표시되지 않습니다.
 */
export const PowerDamageValue = ({ damage, hp }: PowerDamageValueProps) => {
  if (!hp) return null;

  const damageRatio = damage / hp;

  if (damageRatio > 0.66) return <p className="text-red-30">{damage}</p>;
  if (damageRatio > 0.33) return <p className="text-gray-70">{damage}</p>;
  return <p className="text-blue-30">{damage}</p>;
};
