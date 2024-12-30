export interface ErrorComponentProps {
  message: string;
}

export const ErrorComponent = ({ message }: ErrorComponentProps) => {
  return (
    <div className="overflow-hidden self-center flex flex-col items-center w-full h-full max-w-[320px]">
      <img
        src="/assets/img/error.png"
        className="w-full h-full object-cover"
        alt="에러 이미지"
      />
      <p className="text-lg sm:text-2xl lg:text-3xl text-black-10 break-words overflow-wrap break-word leading-relaxed text-center mb-2">
        {message}
      </p>
      <p></p>
      <p className="text-sm lg:text-base text-gray-50 break-words overflow-wrap break-word leading-relaxed text-center">
        포켓몬 api에서 제공되지 않은 데이터이거나,
        <br /> 네트워크 상태가 불안정하다면 사용할 수 없습니다.
        <br /> 다시 한번 확인해주세요.
      </p>
    </div>
  );
};
