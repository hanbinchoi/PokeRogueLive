interface CommonCheckBoxProps {
  label: string;
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
}

/**
 * 공통 체크박스 컴포넌트
 *
 * - 사용자가 체크박스를 클릭하여 선택/해제 상태를 관리할 수 있습니다.
 * - 외부에서 `isChecked`와 `setIsChecked`로 상태를 제어합니다.
 *
 * @param label 체크박스 텍스트 (`string`)
 * @param isChecked 체크박스 초기 선택 상태 (`boolean`)
 * @param setIsChecked 체크박스 상태를 업데이트하는 함수
 */
export const CommonCheckBox = ({
  label,
  isChecked,
  setIsChecked,
}: CommonCheckBoxProps) => {
  /**
   * 체크박스 상태 변경 핸들러
   * - 사용자가 체크박스를 선택/해제했을 때 호출됩니다.
   */
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <label
      className="inline-flex items-center mt-2 text-base md:text-lg lg:text-md"
      htmlFor={`checkbox-${label}`}>
      <input
        type="checkbox"
        id={`checkbox-${label}`}
        className="mr-2 w-3 sm:w-4 h-3 sm:h-4"
        checked={isChecked}
        onChange={handleCheckboxChange}
        aria-checked={isChecked}
      />
      {label}
    </label>
  );
};
