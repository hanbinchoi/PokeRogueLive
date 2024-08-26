import { POKEMON_TYPE } from '@/constants/contents';
import '../../styles/globals.css';
import { TypeCalcButton } from '../TypeCalcButton/TypeCalcButton';
import { TypeCalcOption } from '../TypeCalcOption/TypeCalcOption';

export interface TypeCalcAttackProps {}

export const TypeCalcAttack = ({}: TypeCalcAttackProps) => {
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col px-2 gap-6">
        <TypeCalcOption index={0} />
        <TypeCalcOption index={1} />
      </div>
    </div>
  );
};
