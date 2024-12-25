import { useState } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

export interface AbilityBoxProps {
  text: string;
  visible?: boolean;
}

export const Tooltip = ({ text, visible = true }: AbilityBoxProps) => {
  const [show, setShow] = useState(false);

  const handleMouseEnter = () => {
    setShow(true);
  };

  const handleMouseLeave = () => {
    setShow(false);
  };
  return (
    <div
      className={`relative inline-block ${visible ? ' visible' : 'invisible'}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <FaQuestionCircle
        className="text-blue-70 -right-5 top-0 w-[14px]"
        aria-label="Tooltip trigger"
      />
      <div
        className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black-10 text-white-100 text-xs rounded px-2 py-1 z-10 transition-opacity duration-400 ${
          show ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
        {text}
      </div>
    </div>
  );
};
