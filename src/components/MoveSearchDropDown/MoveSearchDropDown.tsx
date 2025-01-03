import useDropdown from '@/hooks/useDropDown';

import usePowerCalculatorStore from '@/stores/powerCalculatorStore';

import { Dropdown } from '../Dropdown/Dropdown';

import { MoveDataProps } from '@/types/data';

import extractPokemonMoves from '@/utils/extractPokemonMoves';

export interface MoveSearchDropDownProps {
  moves: MoveDataProps[] | undefined;
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
    selectedIndex,
    handleKeyDown: dropdownHandleKeydown,
    clearSearch,
  } = useDropdown(extractMoves.map((m) => m.krName));

  const handleSelect = (option: string) => {
    handleOptionSelect(option);
    setMove(extractMoves?.find((moves) => moves.krName === option) ?? null);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    dropdownHandleKeydown(key);
    if (key === 'Enter' && selectedIndex !== null) {
      e.preventDefault();
      handleSelect(filteredOptions[selectedIndex]);
    }
  };

  const handleClear = () => {
    clearSearch();
    setMove(null);
    setDamages([]);
  };

  return (
    <div className="w-full">
      <label className="text-base md:text-lg" htmlFor="dropdown-move">
        기술
      </label>
      <div className="relative w-full min-w-[120px] max-w-[200px]">
        <input
          id="dropdown-move"
          type="text"
          className="w-full mt-1 md:mt-2 border rounded py-1 px-2 text-sm lg:text-base"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onKeyDown={handleKeyDown}
          placeholder="기술 선택"
          autoComplete="off"
          tabIndex={1}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 p-2 rounded-md text-gray-90 hover:bg-gray-20">
            ✕
          </button>
        )}
        <Dropdown
          dropdownRef={dropdownRef}
          selectedIndex={selectedIndex}
          filteredOptions={filteredOptions}
          handleSelect={handleSelect}
          showDropdown={showDropdown}
          noFoundMessage="기술을 찾을 수 없어요"
        />
      </div>
    </div>
  );
};
