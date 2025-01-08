/**
 * 랜덤수를 반환하는 함수.
 * 확률에 따라 특정 파워 값이 선택되며, 확률은 포켓몬 랜덤수 기반으로 결정됩니다.
 *
 * @returns  85~100 사이의 랜덤 값 (`number`)
 */
export default function getRandomPower() {
  // 각 수 별로 가중치가 다름.
  // 포켓몬 위키피디아 참조 (https://pokemon.fandom.com/ko/wiki/%EB%8D%B0%EB%AF%B8%EC%A7%80#8._%EB%9E%9C%EB%8D%A4%EC%88%98)
  const probabilities = [
    { value: 85, probability: 7.69 },
    { value: 87, probability: 7.69 },
    { value: 89, probability: 7.69 },
    { value: 90, probability: 7.69 },
    { value: 92, probability: 7.69 },
    { value: 94, probability: 7.69 },
    { value: 96, probability: 7.69 },
    { value: 98, probability: 7.69 },
    { value: 86, probability: 5.13 },
    { value: 88, probability: 5.13 },
    { value: 91, probability: 5.13 },
    { value: 93, probability: 5.13 },
    { value: 95, probability: 5.13 },
    { value: 97, probability: 5.13 },
    { value: 99, probability: 5.13 },
    { value: 100, probability: 2.56 },
  ];

  const totalProbability = probabilities.reduce(
    (sum, item) => sum + item.probability,
    0,
  );

  // 랜덤 값 생성 (0 ~ 100 사이)
  const randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;

  // 누적 확률이 랜덤 값보다 커지면 해당 파워 값 반환
  for (const { value, probability } of probabilities) {
    cumulativeProbability += probability;

    if (randomValue <= cumulativeProbability) {
      return value;
    }
  }
  return 85;
}
