import { Field, Weather } from '@/constants/contents';

export const isField = (value: string): value is Field => {
  return Object.values(Field).includes(value as Field);
};

export const isWeather = (value: string): value is Weather => {
  return Object.values(Weather).includes(value as Weather);
};
