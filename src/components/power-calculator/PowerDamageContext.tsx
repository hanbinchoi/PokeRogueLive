import { DamageContextProps } from '@/types/common';

interface PowerDamageContextProps {
  damageContext: DamageContextProps | undefined;
}

export const PowerDamageContext = ({
  damageContext,
}: PowerDamageContextProps) => {
  return (
    <div className="text-center text-xs lg:text-sm text-gray-50">
      {damageContext &&
        Object.entries(damageContext)
          .filter(([_, value]) => value !== null)
          .map(([key, value]) => <p key={`${key}-${value}`}>{value}</p>)}
    </div>
  );
};
