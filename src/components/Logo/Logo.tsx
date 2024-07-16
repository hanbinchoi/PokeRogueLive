import '../../styles/globals.css';

export interface LogoProps {
  size?: 'medium' | 'large';
}

export const Logo = ({ size = 'medium' }: LogoProps) => {
  return (
    <div className="w-[98px] h-[34px]">
      <img
        src="/assets/icon/logo.png"
        className="w-full h-full object-cover"
        alt="로고"
      />
    </div>
  );
};
