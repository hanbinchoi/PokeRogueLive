import { FlavorTextEntryProps } from '@/types/common';

export default function getAbilityDescInKorean(
  flavors: FlavorTextEntryProps[],
) {
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'ko') return flavors[i].flavor_text;
  }
  return null;
}
