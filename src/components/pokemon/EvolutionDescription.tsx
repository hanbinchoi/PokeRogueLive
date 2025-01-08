import { useQuery } from '@tanstack/react-query';

import { getItemInfo } from '@/api/pokemon';

import { EvolutionDetailDataProps, ItemInfoProps } from '@/types/data';

export interface EvolutionDescriptionProps {
  evolutionDetails: EvolutionDetailDataProps[];
}

/**
 * 진화 조건을 설명하는 컴포넌트.
 *
 * - 진화 조건 데이터를 기반으로 조건을 텍스트로 렌더링합니다.
 * - 조건에 따라 행복도, 레벨, 아이템 사용 여부를 표시합니다.
 *
 * @param evolutionDetails 진화 조건 세부 정보 배열(`EvolutionDetailDataProps[]`)
 */
export const EvolutionDescription = ({
  evolutionDetails,
}: {
  evolutionDetails: EvolutionDetailDataProps[];
}) => {
  return (
    <>
      {evolutionDetails.map((detail, index) => {
        if (detail.min_happiness)
          return <span key={index}>행복도 {detail.min_happiness}</span>;

        if (detail.min_level)
          return <span key={index}>레벨 {detail.min_level}</span>;

        if (detail.item)
          return <ItemNameComponent key={index} url={detail.item.url} />;

        return null;
      })}
    </>
  );
};

/**
 * 아이템 이름을 가져와 표시하는 컴포넌트.
 *
 * 진화 정보에서 아이템 사용 진화 정보는 url만 넘겨주므로 해당 url을 다시 호출하는 과정이 필요합니다.
 *
 * - 주어진 URL을 통해 아이템 데이터를 가져옵니다.
 * - 가져온 데이터를 기반으로 한국어 이름을 표시합니다.
 *
 * @param url 아이템 정보를 가져오기 위한 URL
 */
function ItemNameComponent({ url }: { url: string }) {
  const { data } = useQuery<ItemInfoProps>({
    queryKey: ['detail', url],
    queryFn: () => getItemInfo(url),
  });

  if (data)
    return (
      <span>{data.names.find((e) => e.language.name === 'ko')?.name} 사용</span>
    );
}
