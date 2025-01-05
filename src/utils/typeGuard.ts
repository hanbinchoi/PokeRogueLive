import { Field, Weather } from '@/constants/contents';

/**
 * 주어진 값이 `Field` 타입에 속하는지 확인하는 타입 가드 함수.
 *
 * @param value - 확인할 값 (문자열)
 * @returns 값이 `Field`에 해당하는 경우 `true`를 반환, 그렇지 않으면 `false` 반환
 */
export const isField = (value: string): value is Field => {
  return Object.values(Field).includes(value as Field);
};

/**
 * 주어진 값이 `Weather` 타입에 속하는지 확인하는 타입 가드 함수.
 *
 * @param value - 확인할 값 (문자열)
 * @returns 값이 `Weather`에 해당하는 경우 `true`를 반환, 그렇지 않으면 `false` 반환
 */
export const isWeather = (value: string): value is Weather => {
  return Object.values(Weather).includes(value as Weather);
};
