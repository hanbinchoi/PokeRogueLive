import { ErrorComponent } from '@/components/common';

// app/not-found.tsx
export default function NotFound() {
  return (
    <div>
      <ErrorComponent
        message="404 ERROR"
        size="medium"
        description="잘못된 URL을 입력하셨습니다. URL을 다시 한번 확인해주세요."
      />
    </div>
  );
}
