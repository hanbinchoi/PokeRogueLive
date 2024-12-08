import { useEffect, useState } from 'react';

import usePokemonDetailStore from '@/stores/pokemonDetailStore';

import { PageNumber } from '../PageNumber/PageNumber';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';

export const MovePagingDocuments = () => {
  const { now, last, setNow, total, setLast } = usePokemonDetailStore();

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const totalDevideFour = Math.ceil(total / 4);
    if (totalDevideFour <= 5) {
      setPages(
        Array.from({ length: totalDevideFour }, (_, index) => index + 1),
      );
      return;
    }

    if (now <= 3) {
      setLast(false);
      return setPages([1, 2, 3, 4, 5]);
    }

    if (Math.floor(totalDevideFour) - 1 < now)
      return setPages([
        totalDevideFour - 3,
        totalDevideFour - 2,
        totalDevideFour - 1,
        totalDevideFour,
        totalDevideFour + 1,
      ]);

    setLast(false);
    setPages([now - 2, now - 1, now, now + 1, now + 2]);
  }, [now, total]);

  const handlePageClick = (event: React.MouseEvent<HTMLElement>) => {
    const pageNum = parseInt(event.currentTarget.textContent as string);
    if (total / 10 < pageNum) setLast(true);
    setNow(pageNum);
  };

  const handleFirstPageClick = () => {
    setLast(false);
    setNow(1);
  };

  const handlePrevPageClick = () => {
    setLast(false);
    setNow(now - 1);
  };

  const handleLastPageClick = () => {
    setLast(true);
    setNow(Math.floor(total / 4) + 1);
  };

  const handleNextPageClick = () => {
    setLast(false);
    setNow(now + 1);
  };

  return (
    <ul className="mt-5 px-14 text-lg flex justify-center items-center gap-2">
      {now > 1 && (
        <>
          <PageNumber primary={false}>
            <FaAnglesLeft onClick={handleFirstPageClick} className="w-3" />
          </PageNumber>
          <PageNumber primary={false}>
            <FaAngleLeft onClick={handlePrevPageClick} className="w-2" />
          </PageNumber>
        </>
      )}

      {pages.map((ele) =>
        ele === now ? (
          <PageNumber key={ele} primary={true} onClick={handlePageClick}>
            {ele}
          </PageNumber>
        ) : (
          <PageNumber key={ele} primary={false} onClick={handlePageClick}>
            {ele}
          </PageNumber>
        ),
      )}
      {!last && (
        <>
          <PageNumber primary={false}>
            <FaAngleRight onClick={handleNextPageClick} className="w-2" />
          </PageNumber>
          <PageNumber primary={false}>
            <FaAnglesRight onClick={handleLastPageClick} className="w-3" />
          </PageNumber>
        </>
      )}
    </ul>
  );
};
