'use client';

import { useEffect, RefObject } from 'react';

/**
 * 특정 DOM 요소 외부를 클릭할 때 콜백 함수를 실행하기 위한 커스텀 훅

 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useOutsideClick(ref, () => {
 *   console.log('outside click');
 * });
 * ```
 * 
 * @param ref 감지할 DOM 요소의 Ref
 * @param callback  외부 요소 클릭 시 실행 될 callback 함수
 * 
 */
const useOutsideClick = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
