export default function getRandomPower() {
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

  // 확률 합 구하기
  const totalProbability = probabilities.reduce(
    (sum, item) => sum + item.probability,
    0,
  );

  // 랜덤 값 생성 (0 ~ 100 사이)
  const randomValue = Math.random() * totalProbability;

  let cumulativeProbability = 0;

  for (const { value, probability } of probabilities) {
    cumulativeProbability += probability;

    if (randomValue <= cumulativeProbability) {
      return value;
    }
  }
  return 85;
}
