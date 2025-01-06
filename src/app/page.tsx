'use client';

import { ErrorComponent } from '@/components/common/ErrorComponent';
import { LoadingComponent } from '@/components/common/LoadingComponent';

export default function Home() {
  return (
    <main>
      <ErrorComponent message="not found" />
      <LoadingComponent />
    </main>
  );
}
