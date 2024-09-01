import '../../styles/globals.css';
import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

export interface TypeModeToggleProps {}

export const TypeModeToggle = ({}: TypeModeToggleProps) => {
  const { current, setCurrent } = useTypeCalculatorStore();
  const changeCurrent = () => {
    setCurrent(!current);
  };
  return (
    <nav className="type-calc-menu text-lg font-bold flex justify-center">
      <li
        role="button"
        onClick={changeCurrent}
        className={current ? ' ' : 'is-current text-blue-70'}>
        공격
      </li>
      <li
        role="button"
        onClick={changeCurrent}
        className={current ? 'is-current text-blue-70' : ''}>
        방어
      </li>
      <div className="nav-underline"></div>
    </nav>
  );
};
