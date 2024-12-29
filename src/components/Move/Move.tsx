import { twJoin } from 'tailwind-merge';

import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';

import { POKEMON_TYPE } from '@/constants/contents';

import extractMove from '@/utils/extractMove';

export interface MoveProps {
  levelLearnedAt: number;
  url: string;
}
export const Move = ({ levelLearnedAt, url }: MoveProps) => {
  const { isError, isLoading, data } = usePokemonMoveQuery(url);

  if (isError) return <div>move detail error</div>;
  if (isLoading) return <div>move detail loading</div>;

  if (data) {
    const { name, accuracy, flavorText, damageClass, pp, power, type } =
      extractMove(data);

    const { backgroundColor, name: typeName } = POKEMON_TYPE[type];

    return (
      <div className="flex flex-col gap-2 text-xs md:text-sm">
        <div className="flex flex-col min-[480px]:flex-row items-left min-[480px]:items-center gap-2">
          <span
            className={twJoin(
              backgroundColor,
              'text-white-100 px-2 py-1 rounded-md md:rounded-lg w-fit',
            )}>
            {name}
          </span>
          <span className="text-xs md:text-sm font-bold">
            {typeName} | {damageClass} | Lv{levelLearnedAt}
          </span>
        </div>
        <div className="hidden min-[480px]:flex gap-2 text-xs md:text-sm font-bold">
          {power !== null && <span>위력 - {power}</span>}
          {accuracy !== null && <span>명중률 - {accuracy}</span>}
          <span>pp - {pp}</span>
        </div>
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
        <div>{flavorText}</div>
      </div>
    );
  }
};
