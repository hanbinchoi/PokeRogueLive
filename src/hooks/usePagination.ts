'use client';

import { useEffect, useState } from 'react';

/**
 * 넘버링방식 페이지 네이션 로직을 관리하기 위한 커스텀 훅
 * 주요 기능:
 * - 전체 데이터 개수(`total`), 현재 페이지(`now`), 페이지당 데이터 개수(`size`)를 기반으로 동적 페이지 목록을 계산합니다.
 * - 현재 페이지가 변경될 때마다 페이지 목록(`pages`)을 자동으로 업데이트합니다. (개수는 최대 5개)
 * - 특정 페이지로 이동할 수 있는 함수(`goToPage`)를 제공합니다.
 *
 * @param total - 전체 아이템 개수
 * @param now - 현재 페이지 번호
 * @param size - 페이지당 아이템 개수
 * @param setNow - 현재 페이지 번호를 설정하는 setter 함수
 *
 * @returns 현재 페이지 목록과 페이지 이동 함수를 함께 리턴
 */
export const usePagination = (
  total: number,
  now: number,
  size: number,
  setNow: (num: number) => void,
) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const totalPages = Math.ceil(total / size);

    // 전체 페이지가 5보다 작으면 현재 보이는 화면에 노출되는 페이지 목록을 전체 페이지 기준으로 1부터 오름차순으로 설정
    if (totalPages <= 5) {
      setPages(Array.from({ length: totalPages }, (_, index) => index + 1));
      return;
    }

    // 현재 페이지를 기준으로 화면에 노출되는 페이지 목록 설정
    if (now <= 3) {
      setPages([1, 2, 3, 4, 5]);
    } else if (totalPages === now) {
      setPages([now - 4, now - 3, now - 2, now - 1, now]);
    } else if (totalPages - 1 <= now) {
      setPages([now - 3, now - 2, now - 1, now, now + 1]);
    } else {
      setPages([now - 2, now - 1, now, now + 1, now + 2]);
    }
  }, [now, total]);

  /**
   * 페이지 이동 함수
   * @param pageNum - 이동을 원하는 페이지 번호
   *
   * 예외상황 처리:
   * - 0보다 작은경우 1로 설정.
   * - 전체 페이지를 초과하는 경우 마지막 페이지로 설정
   *
   */
  const goToPage = (pageNum: number) => {
    const totalPages = Math.ceil(total / size);
    if (pageNum < 0) return setNow(1);
    if (pageNum > totalPages) {
      return setNow(totalPages);
    }
    return setNow(pageNum);
  };

  return { pages, goToPage };
};
