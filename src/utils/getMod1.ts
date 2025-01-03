import { WeatherType } from '@/types/common';

import { WEATHER } from '@/constants/contents';

export default function getMod1(weather: WeatherType, type: string) {
  if (weather === WEATHER.CLEAR) {
    if (type === 'fire') return 1.5;
    if (type === 'water') return 0.5;
    return 1;
  }
  if (weather === WEATHER.RAIN) {
    if (type === 'water') return 1.5;
    if (type === 'fire') return 0.5;
    return 1;
  }
  return 1;
}
