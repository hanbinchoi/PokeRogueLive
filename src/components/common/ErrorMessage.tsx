interface ErrorMessageProps {
  message?: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className="pl-2 text-red-10 font-bold text-sm absolute left-0 mt-1">
      {message}
    </p>
  );
};
