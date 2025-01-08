import { FlavorTextEntryDataProps } from '@/types/data';

/** API로 부터 받은 특성 설명 데이터 중 한글 데이터를 추출하는 함수
 *
 * 한글 데이터를 미지원하는 경우 영문을 반환
 *
 * @param moves - API로 부터 받은 이름 목록 (`FlavorTextEntryDataProps[]`)
 * @return 추출된 이름 (`string`)
 */
export default function getAbilityDescInKorean(
  flavors: FlavorTextEntryDataProps[],
) {
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'ko') return flavors[i].flavor_text;
  }
  for (let i = flavors.length - 1; i >= 0; i--) {
    if (flavors[i].language.name === 'en') return flavors[i].flavor_text;
  }
  return null;
}
