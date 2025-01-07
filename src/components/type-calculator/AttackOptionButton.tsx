import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

import {
  SpecialAttackAbilityType,
  SpecialAttackMoveType,
} from '@/types/common';

interface AttackOptionButtonProps {
  title: string;
  options: string[];
  usage: 'move' | 'ability';
}

/**
 * 공격 옵션 버튼 컴포넌트
 *
 * 주어진 옵션(기술 또는 특성) 중 하나를 선택할 수 있는 라디오 버튼 형태의 UI를 제공합니다.
 *
 * @param title 버튼 그룹 제목 (`string`)
 * @param options 선택 가능한 옵션 배열 (`string[]`)
 * @param usage "move" 또는 "ability"로, 어떤 타입의 옵션인지 구분 (`'move' | 'ability'`)
 */
export const AttackOptionButton = ({
  title,
  options,
  usage,
}: AttackOptionButtonProps) => {
  const { attackMove, setAttackMove, attackAbility, setAttackAbility } =
    useTypeCalculatorStore();

  const handleClick = (value: string) => {
    if (usage === 'move')
      return attackMove === value
        ? setAttackMove(null)
        : setAttackMove(value as SpecialAttackMoveType);

    if (usage === 'ability')
      return attackAbility === value
        ? setAttackAbility(null)
        : setAttackAbility(value as SpecialAttackAbilityType);
  };
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <p className="text-sm sm:text-base md:text-lg font-semibold">{title}</p>
      <div className="flex gap-x-2 gap-y-2 sm:gap-y-4 flex-wrap">
        {options.map((option) => (
          <label key={option}>
            <div className="px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border cursor-pointer hover:opacity-80">
              <input
                type="radio"
                name={usage}
                value={option}
                checked={
                  usage === 'move'
                    ? attackMove === option
                    : attackAbility === option
                }
                onChange={() => handleClick(option)}
                className="mr-2"
              />
              {option}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
