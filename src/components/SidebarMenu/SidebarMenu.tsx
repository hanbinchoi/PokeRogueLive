import '../../styles/globals.css';

export interface SidebarMenuProps {
  title: string;
}

export const SidebarMenu = ({ title }: SidebarMenuProps) => {
  return <div className="bg-yellow-10 m-4 text-lg">{title}</div>;
};
