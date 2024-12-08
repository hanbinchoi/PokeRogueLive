import { useState } from 'react';

import { FaQuestionCircle } from 'react-icons/fa';

export interface AbilityBoxProps {
  text: string;
}

export const Tooltip = ({ text }: AbilityBoxProps) => {
  const [visible, setVisible] = useState(false);

  const handleMouseEnter = () => {
    setVisible(true);
  };

  const handleMouseLeave = () => {
    setVisible(false);
  };
  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <FaQuestionCircle className="text-blue-70 -right-5 top-0 w-[14px]" />
      {visible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max bg-black-10 text-white-100 text-xs rounded px-2 py-1 z-10">
          {text}
        </div>
      )}
    </div>
  );
};
