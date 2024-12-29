import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { PokemonType, selectUsage } from '@/types/common';

import {
  DEFENCE_ABILITY,
  POKEMON_TYPE,
  POKEMON_TYPE_ARRAY,
} from '@/constants/contents';

interface CommonSelectProps {
  usage: selectUsage;
}

type SelectOptionProps = {
  label: string;
  options: string[];
};

type SelectConstantProps = {
  [key in selectUsage]: SelectOptionProps;
};

export const CommonSelect = ({ usage }: CommonSelectProps) => {
  const { label, options } = selectConstant[usage];
  const { setTeraType, setDefendAbility } = useTypeCalculatorStore();

  const selectAbility = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (usage === 'teraType') setTeraType(value);
    if (usage === 'defenceAbility') setDefendAbility(value);
  };

  return (
    <form className="flex flex-col gap-2 w-full pr-8">
      <label className="text-sm sm:text-base md:text-lg font-semibold">
        {label}
      </label>
      <select
        aria-label="특성을 선택하세요."
        name={label}
        className="px-2 py-1 sm:py-2 min-w-[122px] max-w-[168px] text-sm sm:text-md md:text-base border rounded sm:rounded-lg outline-none hover:opacity-60  focus:border-blue-70 focus:border-2"
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

const selectConstant: SelectConstantProps = {
  defenceAbility: {
    label: '특성',
    options: DEFENCE_ABILITY,
  },
  teraType: {
    label: '테라 타입',
    options: POKEMON_TYPE_ARRAY,
  },
};
