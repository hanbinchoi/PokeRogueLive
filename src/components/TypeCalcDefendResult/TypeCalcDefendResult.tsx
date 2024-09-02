import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';
import calcDefendType from '@/utils/calcDefendType';
import { useEffect } from 'react';
import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';
import { TypeBadge } from '../TypeBadge/TypeBadge';

export const TypeCalcDefendResult = () => {
  const { defendResult, typeCalcOptions, setDefendResult } =
    useTypeCalculatorStore();

  useEffect(() => {
    setDefendResult(calcDefendType(typeCalcOptions[0], typeCalcOptions[1]));
  }, [typeCalcOptions]);

  console.log(defendResult);
  return (
    <div className="flex flex-col gap-8 py-8">
      {defendResult?.quadrupleDamage &&
        defendResult?.quadrupleDamage?.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="text-[16px] font-semibold">4x 피해</div>
            <div className="flex gap-2 flex-wrap">
              {defendResult.quadrupleDamage.map((type) => (
                <TypeBadge key={type} type={type} size="medium" />
              ))}
            </div>
          </div>
        )}
      {defendResult?.doubleDamage && defendResult.doubleDamage.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-semibold">2x 피해</div>
          <div className="flex gap-2 flex-wrap">
            {defendResult.doubleDamage.map((type) => (
              <TypeBadge key={type} type={type} size="medium" />
            ))}
          </div>
        </div>
      )}
      {defendResult?.damage && defendResult.damage.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-semibold">1x 피해</div>
          <div className="flex gap-2 flex-wrap">
            {defendResult.damage.map((type) => (
              <TypeBadge key={type} type={type} size="medium" />
            ))}
          </div>
        </div>
      )}
      {defendResult?.halfDamage && defendResult.halfDamage.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-semibold">0.5x 피해</div>
          <div className="flex gap-2 flex-wrap">
            {defendResult.halfDamage.map((type) => (
              <TypeBadge key={type} type={type} size="medium" />
            ))}
          </div>
        </div>
      )}
      {defendResult?.quarterDamage && defendResult.quarterDamage.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-semibold">0.25x 피해</div>

          <div className="flex gap-2 flex-wrap">
            {defendResult.quarterDamage.map((type) => (
              <TypeBadge key={type} type={type} size="medium" />
            ))}
          </div>
        </div>
      )}
      {defendResult?.noDamage && defendResult?.noDamage.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="text-[16px] font-semibold">0x 피해</div>
          <div className="flex gap-2 flex-wrap">
            {defendResult.noDamage.map((type) => (
              <TypeBadge key={type} type={type} size="medium" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
