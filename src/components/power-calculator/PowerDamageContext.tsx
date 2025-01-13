import { DamageContextProps } from '@/types/common';

interface PowerDamageContextProps {
  damageContext?: DamageContextProps;
}

/**
 * 데미지 계산과 관련된 추가 정보를 표시하는 컴포넌트.
 *
 * @param damageContext - 데미지 계산에 대한 부가 정보 (`DamageContextProps` | `undefined`) - `undefined`일 경우 표시되지 않습니다.
 */
export const PowerDamageContext = ({
  damageContext,
}: PowerDamageContextProps) => {
  return (
    <div className="damage-context text-center text-xs lg:text-sm text-gray-50">
      {damageContext &&
        Object.entries(damageContext)
          .filter(([_, value]) => value !== null)
          .map(([key, value]) => <p key={`${key}-${value}`}>{value}</p>)}
    </div>
  );
};
