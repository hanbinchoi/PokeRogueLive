import { useEffect, useState } from 'react';

export const usePagination = (
  total: number,
  now: number,
  size: number,
  setNow: (num: number) => void,
  setLast: (val: boolean) => void,
) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(total / size);

    if (totalPages <= 5) {
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
      return;
    }

    if (now <= 3) {
      setLast(false);
      setPages([1, 2, 3, 4, 5]);
    } else if (totalPages - 1 < now) {
      setPages([
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
        totalPages + 1,
      ]);
    } else {
      setLast(false);
      setPages([now - 2, now - 1, now, now + 1, now + 2]);
    }
  }, [now, total, setLast]);

  const goToPage = (pageNum: number) => {
    setNow(pageNum);
    if (pageNum >= Math.ceil(total / size)) setLast(true);
    else setLast(false);
  };

  return { pages, goToPage };
};
