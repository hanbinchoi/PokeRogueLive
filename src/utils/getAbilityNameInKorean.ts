import { AbilityNameProps } from '@/types/common';

export default function getAbilityNameInKorean(abilities: AbilityNameProps[]) {
  const ability = abilities.find((ability) => ability.language.name === 'ko');

  return ability
    ? ability.name
    : abilities.find((ability) => ability.language.name === 'en')?.name;
}
