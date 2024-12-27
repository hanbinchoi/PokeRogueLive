import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { MoveProps } from '@/types/common';

import extractPokemonMoves from '@/utils/extractPokemonMoves';
import { DropDown } from '../DropDown/DropDown';

export interface MoveSearchDropDownProps {
  moves: MoveProps[] | undefined;
}

export const MoveSearchDropDown = ({ moves }: MoveSearchDropDownProps) => {
  if (!moves) return;

  const { setMove, setDamages } = usePowerCalculatorStore();

  const extractMoves = extractPokemonMoves(moves);

  const {
    dropdownRef,
    inputValue,
    showDropdown,
    filteredOptions,
    handleInputChange,
    handleOptionSelect,
    setShowDropdown,
    clearSearch,
  } = useDropdown({ options: extractMoves.map((m) => m.krName) });

  const handleSelect = (option: string) => {
    handleOptionSelect(option);
    setMove(extractMoves?.find((moves) => moves.krName === option) ?? null);
  };

  const handleClear = () => {
    clearSearch();
    setMove(null);
    setDamages([]);
  };

  return (
    <div className="w-full">
      <label className="text-lg mb-1" htmlFor="dropdown-move">
        기술
      </label>
      <div className="relative w-[240px]" ref={dropdownRef}>
        <input
          id="dropdown-move"
          type="text"
          className="w-full border rounded p-2"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          placeholder="기술 선택"
          autoComplete="off"
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        <DropDown
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          showDropdown={showDropdown}
          noFoundMessage="기술을 찾을 수 없어요"
        />
      </div>
    </div>
  );
};
