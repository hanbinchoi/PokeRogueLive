import { usePagination } from '@/hooks/usePagination';

import { IconButton, PageButton } from './PageButton';

import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft';
import { FaAngleDoubleLeft } from '@react-icons/all-files/fa/FaAngleDoubleLeft';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import { FaAngleDoubleRight } from '@react-icons/all-files/fa/FaAngleDoubleRight';

export interface PagingDocumentsProps {
  now: number;
  setNow: (now: number) => void;
  total: number;
  pageSize: number;
}

/**
 * 페이징 처리를 위한 컴포넌트
 *
 * 현재 페이지 번호와 전체 아이템 개수에 의거해 페이지 이동 버튼과 페이지 번호 목록을 렌더링 합니다.
 *
 * - now : 현재 페이지 번호 (`number`)
 * - setNow : now를 설정하는 함수 (`function`)
 * - total : 총 아이템 개수 (`number`)
 * - pageSize : 한 페이지 당 보여줄 size (`number`)
 */
export const PagingDocuments = ({
  now,
  setNow,
  total,
  pageSize,
}: PagingDocumentsProps) => {
  const { pages, goToPage } = usePagination(total, now, pageSize, setNow);
  const lastPage = Math.ceil(total / pageSize);

  return (
    <ul className="flex justify-center items-center mt-5 px-14 text-lg gap-2">
      {now > 1 && (
        <>
          <IconButton
            primary={false}
            Icon={FaAngleDoubleLeft}
            onClick={() => goToPage(1)}
          />
          <IconButton
            primary={false}
            Icon={FaAngleLeft}
            onClick={() => goToPage(now - 5)}
          />
        </>
      )}

      {pages.map((pageNum) => (
        <PageButton
          key={pageNum}
          primary={pageNum === now}
          onClick={() => goToPage(pageNum)}>
          {pageNum}
        </PageButton>
      ))}

      {now < lastPage && (
        <>
          <IconButton
            primary={false}
            Icon={FaAngleRight}
            onClick={() => goToPage(now + 5)}
          />
          <IconButton
            primary={false}
            Icon={FaAngleDoubleRight}
            onClick={() => goToPage(lastPage)}
          />
        </>
      )}
    </ul>
  );
};
