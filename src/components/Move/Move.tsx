import { POKEMON_TYPE } from '@/constants/contents';
import usePokemonMoveQuery from '@/hooks/usePokemonMoveQuery';
import getDamageClassInKorean from '@/utils/getDamageClassInKorean';
import { twJoin } from 'tailwind-merge';

export interface MoveProps {
  levelLearnedAt: number;
  url: string;
}
export const Move = ({ levelLearnedAt, url }: MoveProps) => {
  const { isError, isLoading, data } = usePokemonMoveQuery(url);

  if (isError) return <div>move detail error</div>;
  if (isLoading) return <div>move detail loading</div>;

  if (data) {
    const { name, accuracy, flavorText, damageClass, pp, power, type } = {
      name: data.names.find((name) => name.language.name === 'ko')?.name,
      accuracy: data.accuracy,
      flavorText: data.flavor_text_entries.find(
        (flavorText) => flavorText.language.name === 'ko',
      )?.flavor_text,
      damageClass: getDamageClassInKorean(data.damage_class.name),
      pp: data.pp,
      power: data.power,
      type: data.type.name,
    };
    const { backgroundColor, name: typeName } = POKEMON_TYPE[type];

    return (
      <div className="flex flex-col gap-2">
        <div className="flex gap-[10px] items-center">
          <span
            className={twJoin(
              backgroundColor,
              'text-white-100 px-2 py-1 rounded-lg text-[16px] w-fit',
            )}>
            {name}
          </span>
          <span className="font-bold text-[12px]">
            {typeName} | {damageClass} | Lv{levelLearnedAt}
          </span>
        </div>
        <div className="text-[12px] flex gap-[10px] font-bold">
          {power !== null && <span>위력 - {power}</span>}
          {accuracy !== null && <span>명중률 - {accuracy}</span>}
          <span>pp - {pp}</span>
        </div>
        <div className="text-[16px]">{flavorText}</div>
      </div>
    );
  }
};
