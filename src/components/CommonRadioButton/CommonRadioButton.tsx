import useTypeCalculatorStore from '@/stores/TypeCalculatorStore';

interface CommonSelectProps {
  title: string;
  options: string[];
  usage: 'move' | 'ability';
}

export const CommonRadioButton = ({
  title,
  options,
  usage,
}: CommonSelectProps) => {
  const { attackMove, setAttackMove, attackAbility, setAttackAbility } =
    useTypeCalculatorStore();

  const handleRadioClick = (value: string) => {
    if (usage === 'move')
      attackMove === value ? setAttackMove(null) : setAttackMove(value);

    if (usage === 'ability')
      attackAbility === value
        ? setAttackAbility(null)
        : setAttackAbility(value);
  };
  return (
    <div className="flex flex-col gap-2 sm:gap-4">
      <p className="text-sm sm:text-base md:text-lg font-semibold">{title}</p>
      <div className="flex gap-x-2 gap-y-2 sm:gap-y-4 flex-wrap">
        {options.map((option) => (
          <label>
            <div className="px-2 sm:px-3 py-2 text-xs sm:text-sm md:text-base border cursor-pointer hover:opacity-80">
              {usage === 'move' ? (
                <input
                  type="radio"
                  value={option}
                  checked={attackMove === option}
                  onClick={() => handleRadioClick(option)}
                  className="mr-2"
                />
              ) : (
                <input
                  type="radio"
                  value={option}
                  checked={attackAbility === option}
                  onClick={() => handleRadioClick(option)}
                  className="mr-2"
                />
              )}
              {option}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
