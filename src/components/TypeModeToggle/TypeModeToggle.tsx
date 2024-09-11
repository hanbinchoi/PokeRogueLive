import '../../styles/globals.css';

import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

export const TypeModeToggle = () => {
  const { mode, setMode } = useTypeCalculatorStore();

  const changeCurrent = () => {
    setMode(mode === 'defend' ? 'attack' : 'defend');
  };

  return (
    <nav className="type-calc-menu text-lg font-bold flex justify-center">
      <li
        role="button"
        onClick={changeCurrent}
        className={mode === 'defend' ? ' ' : 'is-current text-blue-70'}>
        공격
      </li>
      <li
        role="button"
        onClick={changeCurrent}
        className={mode === 'defend' ? 'is-current text-blue-70' : ''}>
        방어
      </li>
      <div className="nav-underline"></div>
    </nav>
  );
};
