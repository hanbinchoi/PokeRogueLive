import '../../styles/globals.css';

export interface LogoProps {
  size?: 'medium' | 'large';
}

export const Logo = ({ size = 'medium' }: LogoProps) => {
  return (
    <div className={`h-auto ${size === 'large' ? 'w-[294px]' : 'w-[122px]'}`}>
      <img
        src="/assets/img/logo.png"
        className="w-full h-full object-cover"
        alt="로고"
      />
    </div>
  );
};
