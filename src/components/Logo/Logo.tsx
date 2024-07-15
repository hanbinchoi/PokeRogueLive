import '../../styles/globals.css';
import LogoSvg from '../../../public/icon/logo.svg';

export interface LogoProps {
  size?: 'medium' | 'large';
}

export const Logo = ({ size = 'medium' }: LogoProps) => {
  return (
    <button type="button" className="bg-img">
      <LogoSvg width="600" className="w-full" />
    </button>
  );
};
