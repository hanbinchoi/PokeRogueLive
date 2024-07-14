import { twMerge } from 'tailwind-merge';
import '../../styles/globals.css';

export const Header = () => {
  return (
    <header className={twMerge('w-full h-16 bg-gray-10')}>
      <div className="mx-4 h-full flex justify-between items-center">
        <div>logo</div>
        <div>login</div>
      </div>
    </header>
  );
};
