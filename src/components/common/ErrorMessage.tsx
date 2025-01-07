interface ErrorMessageProps {
  message?: string;
}

/**
 * 에러 메시지를 나타내기 위한 Component
 *
 * @param message - 표시할 메시지(`string`)
 */
export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="pl-2 text-red-10 font-bold text-sm absolute left-0 mt-1">
      {message}
    </p>
  );
};
