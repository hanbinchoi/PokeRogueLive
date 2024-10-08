import '../../styles/globals.css';

import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { CommonSelect } from '../CommonSelect/CommonSelect';
import { TypeCalcDefendResult } from '../TypeCalcDefendResult/TypeCalcDefendResult';

export const TypeCalcDefend = () => {
  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="flex flex-col px-2 gap-8">
        <TypeCalcOption title="첫번째" index={0} />
        <TypeCalcOption title="두번째" index={1} />
        <CommonSelect usage="defenceAbility" />
        <CommonSelect usage="teraType" />
      </div>
      <TypeCalcDefendResult />
    </div>
  );
};
