import { AbilityNameDataProps } from '@/types/data';
/** API로 부터 받은 특성 이름 데이터 중 한글 데이터를 추출하는 함수
 *
 * 한글 데이터를 미지원하는 경우 영문을 반환
 *
 * @param moves - API로 부터 받은 이름 목록 (`FlavorTextEntryDataProps[]`)
 * @return 추출된 이름 (`string`)
 */
export default function getAbilityNameInKorean(
  abilities: AbilityNameDataProps[],
) {
  const ability = abilities.find((ability) => ability.language.name === 'ko');

  return ability
    ? ability.name
    : abilities.find((ability) => ability.language.name === 'en')?.name;
}
