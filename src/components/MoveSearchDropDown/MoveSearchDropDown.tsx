import { useDropdown } from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { MoveProps } from '@/types/common';

import extractPokemonMoves from '@/utils/extractPokemonMoves';

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
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        {showDropdown && (
          <div className="absolute z-10 w-full bg-white  shadow max-h-40 overflow-y-auto bg-white-100 border border-t-0">
            {filteredOptions?.map((option, i) => (
              <div
                key={i}
                className="p-2 cursor-pointer hover:bg-gray-50"
                onClick={() => handleSelect(option)}>
                {option}
              </div>
            ))}
            {filteredOptions.length === 0 && (
              <div className="p-2 text-gray-500">
                검색한 옵션을 찾을 수 없어요.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
