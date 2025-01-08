import { WeatherType } from '@/types/common';

import { Weather } from '@/constants/contents';

/**
 * 현재 날씨와 기술 타입을 기반으로 Mod1 값을 계산하는 함수.
 *
 * @param weather - 현재 날씨 상태 (`WeatherType | null`)
 * @param type - 기술의 타입을 나타내는 문자열 (`'fire'`, `'water'` 등)
 *
 * @returns 날씨와 기술 타입에 따른 Mod1 값 (`number`)
 *
 */
export default function getMod1(weather: WeatherType, type: string) {
  if (weather === Weather.CLEAR) {
    if (type === 'fire') return 1.5;
    if (type === 'water') return 0.5;
    return 1;
  }
  if (weather === Weather.RAIN) {
    if (type === 'water') return 1.5;
    if (type === 'fire') return 0.5;
    return 1;
  }
  return 1;
}
