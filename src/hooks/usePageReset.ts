'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import usePokemonsStore from '@/stores/pokemonsStore';

const usePageReset = () => {
  const pathname = usePathname();

  const reset = usePokemonsStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [pathname]);

  return null;
};

export default usePageReset;
