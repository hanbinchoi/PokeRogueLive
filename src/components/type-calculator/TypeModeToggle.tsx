import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import { BattleRoleType } from '@/types/common';

/**
 * 타입 계산기 모드를 관리하는 토글 컴포넌트.
 *
 * 2개의 버튼(공격, 방어)을 제공하며, 버튼 클릭 시 해당 모드로 변경됩니다.
 * 버튼은 현재 활성화된 모드를 기준으로 비활성화되거나 활성화됩니다.
 * hover 애니메이션과 비활성화된 버튼에 대한 스타일링이 적용됩니다.
 */
export const TypeModeToggle = () => {
  const { mode, setMode } = useTypeCalculatorStore();

  const changeCurrent = (selectedMode: BattleRoleType) => {
    if (mode !== selectedMode) {
      setMode(selectedMode);
    }
  };

  return (
    <div className="type-calc-menu text-base sm:text-lg font-bold flex justify-center">
      <button
        onClick={() => changeCurrent('attack')}
        aria-disabled={mode === 'attack'}
        className={
          mode === 'defend'
            ? 'cursor-pointer'
            : 'current text-blue-70 cursor-not-allowed'
        }>
        공격
      </button>
      <button
        onClick={() => changeCurrent('defend')}
        aria-disabled={mode === 'defend'}
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
