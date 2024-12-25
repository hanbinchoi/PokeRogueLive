import { WeatherType } from '@/types/common';

export default function getMod1(weather: WeatherType, type: string) {
  if (weather === '쾌청') {
    if (type === 'fire') return 1.5;
    if (type === 'water') return 0.5;
    return 1;
  }
  if (weather === '비') {
    if (type === 'water') return 1.5;
    if (type === 'fire') return 0.5;
    return 1;
  }
  return 1;
}
