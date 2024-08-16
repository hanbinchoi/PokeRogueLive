import usePokemonsStore from '@/stores/pokemonsStore';
import { useEffect, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { FaAnglesLeft, FaAnglesRight } from 'react-icons/fa6';
import { PageNumber } from '../PageNumber/PageNumber';

export interface PagingDocumentsProps {}

export const PagingDocuments = ({}: PagingDocumentsProps) => {
  const { now, last, setNow, total, setLast } = usePokemonsStore();

  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const totalDevideTen = Math.floor(total / 10);

    if (now <= 3) {
      return setPages([1, 2, 3, 4, 5]);
    }

    if (Math.floor(totalDevideTen) - 1 < now)
      return setPages([
        totalDevideTen - 3,
        totalDevideTen - 2,
        totalDevideTen - 1,
        totalDevideTen,
        totalDevideTen + 1,
      ]);

    setPages([now - 2, now - 1, now, now + 1, now + 2]);
  }, [now]);

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
    setNow(Math.floor(total / 10) + 1);
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
