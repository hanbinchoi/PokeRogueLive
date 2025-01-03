import { EvolutionDetailDataProps } from '@/types/data';

export default function getEvolutionDescription(
  details: EvolutionDetailDataProps[],
) {
  if (!details || details.length === 0) return '';

  return details
    .map((detail) => {
      if (detail.min_happiness) return `행복도 ${detail.min_happiness}`;
      if (detail.min_level) return `레벨 ${detail.min_level} `;
      if (detail.item) return 'item';
    })
    .join(', ');
}
