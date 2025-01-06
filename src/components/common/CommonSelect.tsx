import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { PokemonType, SpecialDefendAbilityType } from '@/types/common';

interface CommonSelectProps {
  label: string;
  options: string[];
}

export const CommonSelect = ({ label, options }: CommonSelectProps) => {
  const { setDefendAbility, setTeraType } = useTypeCalculatorStore();

  const selectAbility = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value !== '' ? event.target.value : null;

    if (label === '특성') setDefendAbility(option as SpecialDefendAbilityType);
    if (label === '테라 타입') setTeraType(option as PokemonType);
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
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
