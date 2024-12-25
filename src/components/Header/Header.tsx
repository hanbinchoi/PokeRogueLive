import { Logo } from '../Logo/Logo';

export const Header = () => {
  return (
    <header className={'border-b border-b-gray-20 px-4 py-2 w-full bg-white'}>
      <div className="flex justify-between items-center">
        <Logo />
      </div>
    </header>
  );
};
