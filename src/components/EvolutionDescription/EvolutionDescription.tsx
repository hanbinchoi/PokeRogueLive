import { getItemInfo } from '@/api/pokemon';
import { EvolutionDetailProps, ItemInfoProps } from '@/types/common';
import { useQuery } from '@tanstack/react-query';

export interface EvolutionDescriptionProps {
  evolutionDetails: EvolutionDetailProps[];
}

export const EvolutionDescription = ({
  evolutionDetails,
}: EvolutionDescriptionProps) => {
  const description = evolutionDetails.map((detail) => {
    if (detail.min_happiness) return `행복도 ${detail.min_happiness}`;
    if (detail.min_level) return `레벨 ${detail.min_level}`;
    if (detail.item) return <ItemNameComponent url={detail.item.url} />;
    return '';
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
