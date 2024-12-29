import { DamageContextProps } from '@/types/common';

interface PowerDamageContextProps {
  damageContext: DamageContextProps | undefined;
}

export const PowerDamageContext = ({
  damageContext,
}: PowerDamageContextProps) => {
  return (
    <div className="text-center text-sm lg:text-base text-gray-50">
      {damageContext &&
        Object.entries(damageContext)
          .filter(([_, value]) => value !== null)
          .map(([key, value]) => <p key={`${key}-${value}`}>{value}</p>)}
    </div>
  );
};
