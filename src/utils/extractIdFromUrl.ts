/**
 * 주어진 URL에서 Id(숫자)만 추출하는 함수
 * @param url - 문자열로 된 URL (`string`)
 * @returns - URL에서 추출한 Id (`number`)
 */
export default function extractIdFromUrl(url: string) {
  const match = url.match(/\/(\d+)\/?$/); // URL의 마지막 숫자를 캡처

  return match ? parseInt(match[1], 10) : 0; // 캡처된 숫자를 정수로 변환
}
