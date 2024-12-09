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
    } else if (totalPages === now) {
      setLast(true);
      setPages([now - 4, now - 3, now - 2, now - 1, now]);
    } else if (totalPages - 1 <= now) {
      setPages([now - 3, now - 2, now - 1, now, now + 1]);
    } else {
      setLast(false);
      setPages([now - 2, now - 1, now, now + 1, now + 2]);
    }
  }, [now, total]);

  const goToPage = (pageNum: number) => {
    const totalPages = Math.ceil(total / size);
    if (pageNum < 0) return setNow(1);
    if (pageNum > totalPages) {
      setNow(totalPages);
      return setLast(true);
    }
    if (pageNum === totalPages) {
      setNow(pageNum);
      return setLast(true);
    }
    setNow(pageNum);
    return setLast(false);
  };

  return { pages, goToPage };
};
