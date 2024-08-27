import '../../styles/globals.css';

import { selectUsage } from '@/types/common';

import { DEFENCE_ABILITY, POKEMON_TYPE_ARRAY_KR } from '@/constants/contents';

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

  const selectAbility = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value);
  };

  return (
    <form className="flex flex-col gap-2">
      <label className="text-[16px] font-semibold">{label}</label>
      <select
        aria-label="특성을 선택하세요."
        className="px-4 py-2 border rounded-lg outline-none hover:opacity-60  focus:border-blue-70 focus:border-2"
        onChange={selectAbility}>
        <option value="">없음</option>
        <hr />
        {options.map((option) =>
          option === '스텔라' || option === '???' ? null : (
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
    options: POKEMON_TYPE_ARRAY_KR,
  },
};
