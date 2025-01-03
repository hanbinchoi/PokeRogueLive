import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import {
  PokemonTypeName,
  SelectOptionProps,
  selectUsage,
} from '@/types/common';

import {
  DEFENCE_ABILITY,
  POKEMON_TYPE_INFO,
  POKEMON_TYPE_ARRAY,
} from '@/constants/contents';

interface CommonSelectProps {
  usage: selectUsage;
}

type SelectConstantProps = {
  [key in selectUsage]: SelectOptionProps;
};

export const CommonSelect = ({ usage }: CommonSelectProps) => {
  const selectConstant: SelectConstantProps = {
    defenceAbility: {
      label: '특성',
      options: DEFENCE_ABILITY,
      set: useTypeCalculatorStore((state) => state.setDefendAbility),
    },
    teraType: {
      label: '테라 타입',
      options: POKEMON_TYPE_ARRAY,
      set: useTypeCalculatorStore((state) => state.setTeraType),
    },
  };

  const { label, options, set } = selectConstant[usage];

  const selectAbility = (event: React.ChangeEvent<HTMLSelectElement>) => {
    set(event.target.value);
  };

  return (
    <div className="flex flex-col gap-2 w-full pr-8">
      <label className="text-sm sm:text-base md:text-lg font-semibold">
        {label}
      </label>
      <select
        aria-label={`${label}`}
        name={label}
        className="px-2 py-1 sm:py-2 min-w-[122px] max-w-[188px] text-sm sm:text-md md:text-base border rounded sm:rounded-lg outline-none hover:opacity-60  focus:border-blue-70 focus:border-2"
        onChange={selectAbility}>
        <option value="">없음</option>
        {options.map((option) =>
          usage === 'teraType' ? (
            option === 'stellar' || option === 'unknown' ? null : (
              <option key={option} value={option}>
                {POKEMON_TYPE_INFO[option as PokemonTypeName].name}
              </option>
            )
          ) : (
            <option key={option} value={option}>
              {option}
            </option>
          ),
        )}
      </select>
    </div>
  );
};
