'use client';

import { useState } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

export interface AbilityBoxProps {
  text: string;
}

/**
 * 툴팁 컴포넌트
 *
 * 마우스가 툴팁 아이콘 위에 있을 때, 툴팁이 나타나도록 합니다.
 *
 * @param text 툴팁에 표시할 텍스트 (`string`)
 */
export const Tooltip = ({ text }: AbilityBoxProps) => {
  const [show, setShow] = useState(false);

  // 마우스 이벤트에 따라 툴팁을 표시하거나 숨깁니다
  const toggleTooltip = (isVisible: boolean) => setShow(isVisible);

  return (
    <div
      className="relative inline-block" // 부모에 relative 추가
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}>
      <FaQuestionCircle
        className="text-blue-70 -right-5 top-0 w-[14px]"
        aria-label="Tooltip trigger"
      />
      <div
        className={`w-max max-w-[200px] md:max-w-[400px] absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black-10 text-white-100 text-xs rounded px-2 py-1 z-10 transition-opacity duration-400 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        {text}
      </div>
    </div>
  );
};
