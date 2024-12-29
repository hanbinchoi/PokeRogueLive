import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { typeCalcMode } from '@/types/common';

export const TypeModeToggle = () => {
  const { mode, setMode } = useTypeCalculatorStore();

  const changeCurrent = (selectedMode: typeCalcMode) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
    }
  };

  return (
    <div className="type-calc-menu text-base sm:text-lg font-bold flex justify-center">
      <button
        onClick={() => changeCurrent('attack')}
        aria-disabled={mode !== 'defend'}
        className={
          mode === 'defend'
            ? 'cursor-pointer'
            : 'current text-blue-70 cursor-not-allowed'
        }>
        공격
      </button>
      <button
        onClick={() => changeCurrent('defend')}
        aria-disabled={mode !== 'attack'}
        className={
          mode === 'defend'
            ? 'current text-blue-70 cursor-not-allowed'
            : 'cursor-pointer'
        }>
        방어
      </button>
      <div className="nav-underline"></div>
    </div>
  );
};
