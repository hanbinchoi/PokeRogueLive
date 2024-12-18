import { damageContextProps } from '@/types/common';

interface PowerDamageContextProps {
  damageContext: damageContextProps | undefined;
}

export const PowerDamageContext = ({
  damageContext,
}: PowerDamageContextProps) => {
  return (
    <div className="text-center">
      {damageContext &&
        Object.entries(damageContext)
          .filter(([_, value]) => value !== null)
          .map(([key, value]) => (
            <p key={key} className="text-sm text-gray-50">
              {value}
            </p>
          ))}
    </div>
  );
};
