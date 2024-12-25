interface CommonCheckBoxProps {
  label: string;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

export const CommonCheckBox = ({
  label,
  isChecked,
  setIsChecked,
}: CommonCheckBoxProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <label
      className="inline-flex items-center mt-2 text-lg"
      htmlFor={`checkbox-${label}`}>
      <input
        type="checkbox"
        id={`checkbox-${label}`}
        className="mr-2 w-4 h-4"
        checked={isChecked}
        onChange={handleCheckboxChange}
        aria-checked={isChecked}
      />
      {label}
    </label>
  );
};
