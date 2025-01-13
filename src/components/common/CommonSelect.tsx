import {
  POKEMON_TYPE_INFO,
  PokemonTypeName,
  SelectUsage,
} from '@/constants/contents';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import {
  PokemonType,
  SelectUsageType,
  SpecialDefendAbilityType,
} from '@/types/common';

interface CommonSelectProps {
  label: string;
  options: string[];
  usage: SelectUsageType;
}

/**
 * 공통 드롭다운 컴포넌트
 *
 * - 사용 목적에 따라 특성 또는 테라 타입 선택 가능
 * - 선택된 옵션 값을 상태 관리 스토어에 업데이트
 */
export const CommonSelect = ({ label, options, usage }: CommonSelectProps) => {
  const { setDefendAbility, setTeraType } = useTypeCalculatorStore();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const option = event.target.value !== '' ? event.target.value : null; // 없음(빈값)은 null 처리

    if (usage === SelectUsage.ABILITY)
      return setDefendAbility(option as SpecialDefendAbilityType);

    if (usage === SelectUsage.TERATYPE) {
      const type = Object.keys(POKEMON_TYPE_INFO).find(
        (key) => POKEMON_TYPE_INFO[key as PokemonTypeName].name === option,
      );
      return setTeraType(type as PokemonTypeName);
    }
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
        onChange={handleChange}>
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
