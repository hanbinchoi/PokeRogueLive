'use client';
import { Button } from '@/components/Button/Button';
import { SearchInput } from '@/components/SearchInput/SearchInput';

export default function Pokemon() {
  return (
    <main className="">
      <div>메인 페이지</div>
      <SearchInput placeholder="placeholder" inline label="test" />
    </main>
  );
}
