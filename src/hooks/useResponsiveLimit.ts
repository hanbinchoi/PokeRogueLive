import { useEffect } from 'react';

/**
 * 화면 크기에 따라 페이징 처리되는 limit 개수를 설정하는 커스텀 훅.
 * - width > 1280 : 10
 * - width > 1024 : 8
 * - width > 640 : 6
 * - width > 480 : 4
 * - width <= 480 : 2
 * @param setLimit limit setter 함수
 */
export default function useResponsiveLimit(setLimit: (value: number) => void) {
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setLimit(10);
      } else if (window.innerWidth >= 1024) {
        setLimit(8);
      } else if (window.innerWidth >= 640) {
        setLimit(6);
      } else if (window.innerWidth >= 480) {
        setLimit(4);
      } else {
        setLimit(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [setLimit]);
}
