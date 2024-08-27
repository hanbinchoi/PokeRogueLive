export const TOTAL_POKEMON_NUM = 1025;

export const POKEMON_TYPE = {
  normal: {
    backgroundColor: 'bg-type-normal',
    name: '노말',
  },
  fighting: {
    backgroundColor: 'bg-type-fighting',
    name: '격투',
  },
  flying: {
    backgroundColor: 'bg-type-flying',
    name: '비행',
  },
  poison: {
    backgroundColor: 'bg-type-poison',
    name: '독',
  },
  ground: {
    backgroundColor: 'bg-type-ground',
    name: '땅',
  },
  rock: {
    backgroundColor: 'bg-type-rock',
    name: '바위',
  },
  bug: {
    backgroundColor: 'bg-type-bug',
    name: '벌레',
  },
  ghost: {
    backgroundColor: 'bg-type-ghost',
    name: '고스트',
  },
  steel: {
    backgroundColor: 'bg-type-steel',
    name: '강철',
  },
  fire: {
    backgroundColor: 'bg-type-fire',
    name: '불꽃',
  },
  water: {
    backgroundColor: 'bg-type-water',
    name: '물',
  },
  grass: {
    backgroundColor: 'bg-type-grass',
    name: '풀',
  },
  electric: {
    backgroundColor: 'bg-type-electric',
    name: '전기',
  },
  psychic: {
    backgroundColor: 'bg-type-psychic',
    name: '에스퍼',
  },
  ice: {
    backgroundColor: 'bg-type-ice',
    name: '얼음',
  },
  dragon: {
    backgroundColor: 'bg-type-dragon',
    name: '드래곤',
  },
  dark: {
    backgroundColor: 'bg-type-dark',
    name: '악',
  },
  fairy: {
    backgroundColor: 'bg-type-fairy',
    name: '페어리',
  },
  stellar: {
    backgroundColor: 'bg-type-stellar',
    name: '스텔라',
  },
  unknown: {
    backgroundColor: 'bg-type-unknown',
    name: '???',
  },
};

export const POKEMON_TYPE_ARRAY = Object.keys(POKEMON_TYPE);

export const POKEMON_TYPE_ARRAY_KR = Object.keys(POKEMON_TYPE).map(
  (key) => (POKEMON_TYPE as any)[key].name,
);

export const TYPE_CALC_OPTION_TITLE = ['첫번째', '두번째'];

export const DEFENCE_ABILITY = [
  '건조피부',
  '내열',
  '노릇노릇바디',
  '델타스트림',
  '두꺼운지방',
  '마중물',
  '복슬복슬',
  '부유',
  '불가사의부적',
  '수포',
  '저수',
  '전기엔진',
  '정화의소금',
  '축전',
  '타오르는불꽃',
  '테라셀',
  '피뢰침',
  '필터',
  '흙먹기',
  '흡수',
];
