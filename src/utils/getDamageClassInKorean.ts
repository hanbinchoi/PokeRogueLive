export default function getDamageClassInKorean(damageClass: string) {
  if (damageClass === 'physical') return '물리';
  if (damageClass === 'special') return '특수';
  if (damageClass === 'status') return '상태';
  return 'unknown';
}
