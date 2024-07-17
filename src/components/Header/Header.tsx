import { twMerge } from 'tailwind-merge';
import '../../styles/globals.css';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <header
      className={twMerge(
        'border-b border-b-gray-10 px-4 py-2 w-full bg-white-100',
      )}>
      <div className="  flex justify-between items-center">
        <Logo size="medium" />
        <div>login</div>
      </div>
    </header>
  );
};
