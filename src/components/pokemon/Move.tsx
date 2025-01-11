import { twJoin } from 'tailwind-merge';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';

import { ErrorComponent, LoadingComponent } from '../common';

import { POKEMON_TYPE_INFO } from '@/constants/contents';

import extractMove from '@/utils/extractMove';

export interface MoveProps {
  levelLearnedAt: number;
  url: string;
}

/**
 * 기술을 표시하기 위한 컴포넌트
 *
 * props로 api url을 넘겨받아 기술 데이터를 fetch
 *
 * @param levelLearnedAt 배우는 레벨 (`number`)
 * @param url 기술 api url 정보 (`string`)
 */
export const Move = ({ levelLearnedAt, url }: MoveProps) => {
  const { isError, isLoading, data } = usePokemonMoveQuery(url);
  console.log(data);
  if (isLoading) {
    return (
      <div className="w-full h-full mb-2">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="w-full h-full">
        <ErrorComponent
          message="기술을 불러오는데 실패했습니다."
          size="xsmall"
        />
      </div>
    );
  }

  if (data) {
    const { name, accuracy, flavorText, damageClass, pp, power, type } =
      extractMove(data);
    const { backgroundColor, name: typeName } = POKEMON_TYPE_INFO[type];

    // 기술 타입에 따른 배경 색상 및 타입 이름 설정
    const moveTypeStyle = twJoin(
      backgroundColor,
      'text-white-100 px-2 py-1 rounded-md md:rounded-lg w-fit',
    );

    // 데스크탑 화면에서 표시할 기술 정보
    const desktopStats = (
      <div className="hidden min-[480px]:flex gap-2 text-xs md:text-sm font-bold">
        {power !== null && <span>위력 - {power}</span>}
        {accuracy !== null && <span>명중률 - {accuracy}</span>}
        <span>pp - {pp}</span>
      </div>
    );

    // 모바일 화면에서 표시할 기술 정보
    const mobileStats = (
      <div className="flex min-[480px]:hidden gap-2 text-xs md:text-sm font-bold">
        {power !== null && (
          <>
            <div>
              <div>위력</div>
              {power}
            </div>
            <div className="w-0.5 bg-black-50"></div>
          </>
        )}
        {accuracy !== null && (
          <>
            <div>
              <div>명중률</div>
              {accuracy}
            </div>
            <div className="w-0.5 bg-black-50"></div>
          </>
        )}
        <div>
          <div>pp</div>
          {pp}
        </div>
      </div>
    );

    return (
      <div className="flex flex-col gap-2 text-xs md:text-sm">
        <div className="flex flex-col min-[480px]:flex-row items-left min-[480px]:items-center gap-2">
          <span className={moveTypeStyle}>{name}</span>
          <span className="text-xs md:text-sm font-bold">
            {typeName} | {damageClass} | Lv{levelLearnedAt}
          </span>
        </div>

        {desktopStats}
        {mobileStats}

        <div>{flavorText}</div>
      </div>
    );
  }

  return null;
};
