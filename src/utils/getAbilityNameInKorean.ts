import { AbilityNameDataProps } from '@/types/data';

export default function getAbilityNameInKorean(
  abilities: AbilityNameDataProps[],
) {
  const ability = abilities.find((ability) => ability.language.name === 'ko');

  return ability
    ? ability.name
    : abilities.find((ability) => ability.language.name === 'en')?.name;
}
