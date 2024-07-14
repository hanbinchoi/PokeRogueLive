import { twMerge } from 'tailwind-merge';
import '../../styles/globals.css';

import { SidebarMenu } from '../SidebarMenu/SidebarMenu';

export const Sidebar = () => {
  return (
    <nav className={twMerge('w-1/5 flex-grow-1 bg-red-10')}>
      <SidebarMenu title="test" />
    </nav>
  );
};
