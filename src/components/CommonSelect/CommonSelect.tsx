import '../../styles/globals.css';

import { PokemonType, selectUsage } from '@/types/common';

import {
  DEFENCE_ABILITY,
  POKEMON_TYPE,
  POKEMON_TYPE_ARRAY,
  POKEMON_TYPE_ARRAY_KR,
} from '@/constants/contents';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

export interface CommonSelectProps {
  usage: selectUsage;
}

type SelectOptionProps = {
  label: string;
  options: string[];
};

export type SelectConstantProps = {
  [key in selectUsage]: SelectOptionProps;
};

export const CommonSelect = ({ usage }: CommonSelectProps) => {
  const { label, options } = selectConstant[usage];
  const { setTeraType } = useTypeCalculatorStore();

  const selectAbility = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (usage === 'teraType') setTeraType(value);
  };

  return (
    <form className="flex flex-col gap-2 w-full pr-16">
      <label className="text-[16px] font-semibold">{label}</label>
      <select
        aria-label="특성을 선택하세요."
        name={label}
        className="px-4 py-2 border rounded-lg outline-none hover:opacity-60  focus:border-blue-70 focus:border-2"
        onChange={selectAbility}>
        <option value="">없음</option>
        <hr />
        {options.map((option) =>
          usage === 'teraType' ? (
            option === 'stellar' || option === 'unknown' ? null : (
              <option key={option} value={option}>
                {POKEMON_TYPE[option as PokemonType].name}
              </option>
            )
          ) : (
            <option key={option} value={option}>
              {option}
            </option>
          ),
        )}
      </select>
    </form>
  );
};
export const selectConstant: SelectConstantProps = {
  defenceAbility: {
    label: '특성 선택',
    options: DEFENCE_ABILITY,
  },
  teraType: {
    label: '테라 타입',
    options: POKEMON_TYPE_ARRAY,
  },
};
