import { MoveDetailProps } from '@/types/common';

import getDamageClassInKorean from './getDamageClassInKorean';

export default function extractMove(data: MoveDetailProps) {
  const { name, accuracy, flavorText, damageClass, pp, power, type } = {
    name:
      data.names.find((name) => name.language.name === 'ko')?.name || data.name,
    accuracy: data.accuracy,
    flavorText: data.flavor_text_entries.find(
      (flavorText) => flavorText.language.name === 'ko',
    )?.flavor_text,
    damageClass: getDamageClassInKorean(data.damage_class.name),
    pp: data.pp,
    power: data.power,
    type: data.type.name,
  };

  return { name, accuracy, flavorText, damageClass, pp, power, type };
}
