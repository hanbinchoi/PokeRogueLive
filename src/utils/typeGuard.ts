import { FIELD, WEATHER } from '@/constants/contents';

export const isField = (value: string): value is FIELD => {
  return Object.values(FIELD).includes(value as FIELD);
};

export const isWeather = (value: string): value is WEATHER => {
  return Object.values(WEATHER).includes(value as WEATHER);
};
