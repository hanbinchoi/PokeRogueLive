import { twMerge } from 'tailwind-merge';
import '../../styles/globals.css';
import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <header className={twMerge('w-full bg-white-100')}>
      <div className="mx-4 my-2 flex justify-between items-center">
        <Logo size="medium" />
        <div>login</div>
      </div>
    </header>
  );
};
