import { useQuery } from '@tanstack/react-query';

import { getItemInfo } from '@/api/pokemon';

import { EvolutionDetailProps, ItemInfoProps } from '@/types/common';

export interface EvolutionDescriptionProps {
  evolutionDetails: EvolutionDetailProps[];
}

export const EvolutionDescription = ({
  evolutionDetails,
}: EvolutionDescriptionProps) => {
  const description = evolutionDetails.map((detail, index) => {
    const key =
      detail.min_happiness || detail.min_level || detail.item?.url || index;

    if (detail.min_happiness)
      return <span key={key}>행복도 {detail.min_happiness}</span>;

    if (detail.min_level) return <span key={key}>레벨 {detail.min_level}</span>;

    if (detail.item)
      return <ItemNameComponent key={key} url={detail.item.url} />;

    return <span key={key}></span>;
  });
  return <div>{description}</div>;
};

function ItemNameComponent({ url }: { url: string }) {
  const { data, isLoading, isError } = useQuery<ItemInfoProps>({
    queryKey: ['detail', url],
    queryFn: () => getItemInfo(url),
  });

  if (isLoading) return <span>loading...</span>;
  if (isError) return <span>error</span>;
  if (data)
    return (
      <span>{data.names.find((e) => e.language.name === 'ko')?.name} 사용</span>
    );
}
