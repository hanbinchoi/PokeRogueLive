import { MoveDetailDataProps } from '@/types/data';
import { MoveStatusKey } from '@/types/common';

import { MOVE_STATUS_KOREAN_MAP } from '@/constants/contents';

/**
 * api 응답으로부터 받은 Move 데이터를 필요한 정보만 추출하는 함수.
 * @param data - API 응답에서 받은 Move 데이터 (`MoveDetailDataProps`)
 * @returns 필요한 정보만 추출된 Move 객체
 */
export default function extractMove(data: MoveDetailDataProps) {
  const name =
    data.names.find((name) => name.language.name === 'ko')?.name || data.name;

  const flavorText = data.flavor_text_entries.find(
    (flavorText) => flavorText.language.name === 'ko',
  )?.flavor_text;

  const damageClass =
    MOVE_STATUS_KOREAN_MAP[data.damage_class.name as MoveStatusKey];

  return {
    name,
    accuracy: data.accuracy,
    flavorText,
    damageClass,
    pp: data.pp,
    power: data.power,
    type: data.type.name,
  };
}
