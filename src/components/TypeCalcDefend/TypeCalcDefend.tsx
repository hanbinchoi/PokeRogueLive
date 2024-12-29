import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { CommonSelect } from '../CommonSelect/CommonSelect';
import { TypeCalcDefendResult } from '../TypeCalcDefendResult/TypeCalcDefendResult';

import { selectUsage } from '@/types/common';

export const TypeCalcDefend = () => {
  const options = [
    { title: '첫번째', index: 0 },
    { title: '두번째', index: 1 },
  ];
  const usages: selectUsage[] = ['defenceAbility', 'teraType'];

  return (
    <div className="grid grid-cols-2 gap-8 md:gap-16">
      <div className="flex flex-col gap-4 sm:gap-8">
        {options.map((option) => (
          <TypeCalcOption
            key={option.index}
            title={option.title}
            index={option.index}
          />
        ))}
        {usages.map((usage, i) => (
          <CommonSelect key={i} usage={usage} />
        ))}
      </div>
      <TypeCalcDefendResult />
    </div>
  );
};
