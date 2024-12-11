import '../../styles/globals.css';

import { UseFormRegister } from 'react-hook-form';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { InputValues } from '@/types/common';

interface CommonSelectProps {
  title: string;
  options: string[];
  watch: keyof InputValues;
  register: UseFormRegister<InputValues>;
}

export const CommonRadioButton = ({
  title,
  options,
  watch,
  register,
}: CommonSelectProps) => {
  const { attackMove, setAttackMove, attackAbility, setAttackAbility } =
    useTypeCalculatorStore();
  const handleRadioClick = (value: string, watch: keyof InputValues) => {
    if (watch === 'move') {
      if (attackMove === value) {
        setAttackMove(null);
      } else {
        setAttackMove(value);
      }
    }
    if (watch === 'ability') {
      if (attackAbility === value) {
        setAttackAbility(null);
      } else {
        setAttackAbility(value);
      }
    }
  };
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[16px] font-semibold">{title}</p>
      <div className="flex gap-x-2 gap-y-4 flex-wrap">
        {options.map((option) => (
          <label>
            <div className="p-2 border cursor-pointer hover:opacity-80">
              {watch === 'move' ? (
                <input
                  type="radio"
                  {...register(watch)}
                  value={option}
                  checked={attackMove === option}
                  onClick={() => handleRadioClick(option, watch)}
                  className="mr-2 font-bold text-[12px]"
                />
              ) : (
                <input
                  type="radio"
                  {...register(watch)}
                  value={option}
                  checked={attackAbility === option}
                  onClick={() => handleRadioClick(option, watch)}
                  className="mr-2 font-bold text-[12px]"
                />
              )}

              {option}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
