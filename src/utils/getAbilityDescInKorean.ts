import { FlavorTextEntryDataProps } from '@/types/data';

export default function getAbilityDescInKorean(
  flavors: FlavorTextEntryDataProps[],
) {
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'ko') return flavors[i].flavor_text;
  }
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'en') return flavors[i].flavor_text;
  }
  return null;
}
