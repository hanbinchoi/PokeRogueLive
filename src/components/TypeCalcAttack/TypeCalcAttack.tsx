import '../../styles/globals.css';

import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';
import { CommonSelect } from '../CommonSelect/CommonSelect';
import { TypeCalcDefendResult } from '../TypeCalcDefendResult/TypeCalcDefendResult';

export const TypeCalcAttack = () => {
  return (
    <div className="grid grid-cols-2 gap-16">
      <div className="flex flex-col px-2 gap-8">
        <TypeCalcOption title="타입" index={0} />
        <CommonSelect usage="defenceAbility" />
        <CommonSelect usage="teraType" />
      </div>
      <TypeCalcDefendResult />
    </div>
  );
};
