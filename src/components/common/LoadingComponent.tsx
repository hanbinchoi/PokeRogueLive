/**
 * 로딩 상태 시 표시 할 컴포넌트
 */
export const LoadingComponent = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="inline-block w-10 h-10 border-4 border-t-transparent border-solid rounded-full animate-spin border-blue-30"></div>
    </div>
  );
};
