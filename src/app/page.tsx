'use client';

import { ErrorComponent } from '@/components/ErrorComponent/ErrorComponent';
import { LoadingComponent } from '@/components/LoadingComponent/LoadingComponent';

export default function Home() {
  return (
    <main>
      <ErrorComponent message="not found" />
      <LoadingComponent />
    </main>
  );
}
