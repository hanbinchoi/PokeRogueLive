import { FlavorTextEntryProps } from '@/types/common';

export default function getAbilityDescInKorean(
  flavors: FlavorTextEntryProps[],
) {
  console.log(flavors);
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'ko') return flavors[i].flavor_text;
  }
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'en') return flavors[i].flavor_text;
  }
  return null;
}
