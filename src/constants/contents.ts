import { PokemonType, PokemonTypeProps } from '@/types/common';

export const TOTAL_POKEMON_NUM = 1025;

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

export const POKEMON_TYPE = {
  normal: {
    backgroundColor: 'bg-type-normal',
    name: '노말',
    doubleDamage: ['fighting'],
    halfDamage: [],
    noDamage: ['ghost'],
  },
  fighting: {
    backgroundColor: 'bg-type-fighting',
    name: '격투',
    doubleDamage: ['flying', 'psychic', 'fairy'],
    halfDamage: ['bug', 'rock', 'dark'],
    noDamage: [],
  },
  flying: {
    backgroundColor: 'bg-type-flying',
    name: '비행',
    doubleDamage: ['electric', 'ice', 'rock'],
    halfDamage: ['grass', 'fighting', 'bug'],
    noDamage: ['ground'],
  },
  poison: {
    backgroundColor: 'bg-type-poison',
    name: '독',
    doubleDamage: ['ground', 'psychic'],
    halfDamage: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
    noDamage: [],
  },
  ground: {
    backgroundColor: 'bg-type-ground',
    name: '땅',
    doubleDamage: ['water', 'grass', 'ice'],
    halfDamage: ['poison', 'rock'],
    noDamage: ['electric'],
  },
  rock: {
    backgroundColor: 'bg-type-rock',
    name: '바위',
    doubleDamage: ['water', 'grass', 'fighting', 'ground', 'steel'],
    halfDamage: ['normal', 'fire', 'poison', 'flying'],
    noDamage: [],
  },
  bug: {
    backgroundColor: 'bg-type-bug',
    name: '벌레',
    doubleDamage: ['fire', 'flying', 'rock'],
    halfDamage: ['grass', 'fighting', 'ground'],
    noDamage: [],
  },
  ghost: {
    backgroundColor: 'bg-type-ghost',
    name: '고스트',
    doubleDamage: ['ghost', 'dark'],
    halfDamage: ['poison', 'bug'],
    noDamage: ['normal', 'fighting'],
  },
  steel: {
    backgroundColor: 'bg-type-steel',
    name: '강철',
    doubleDamage: ['fire', 'fighting', 'ground'],
    halfDamage: [
      'normal',
      'grass',
      'ice',
      'flying',
      'psychic',
      'bug',
      'rock',
      'dragon',
      'steel',
      'fairy',
    ],
    noDamage: ['poison'],
  },
  fire: {
    backgroundColor: 'bg-type-fire',
    name: '불꽃',
    doubleDamage: ['water', 'ground', 'rock'],
    halfDamage: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
    noDamage: [],
  },
  water: {
    backgroundColor: 'bg-type-water',
    name: '물',
    doubleDamage: ['electric', 'grass'],
    halfDamage: ['fire', 'water', 'ice', 'steel'],
    noDamage: [],
  },
  grass: {
    backgroundColor: 'bg-type-grass',
    name: '풀',
    doubleDamage: ['fire', 'ice', 'poison', 'flying', 'bug'],
    halfDamage: ['water', 'electric', 'grass', 'ground'],
    noDamage: [],
  },
  electric: {
    backgroundColor: 'bg-type-electric',
    name: '전기',
    doubleDamage: ['ground'],
    halfDamage: ['electric', 'flying', 'steel'],
    noDamage: [],
  },
  psychic: {
    backgroundColor: 'bg-type-psychic',
    name: '에스퍼',
    doubleDamage: ['bug', 'ghost', 'dark'],
    halfDamage: ['fighting', 'psychic'],
    noDamage: [],
  },
  ice: {
    backgroundColor: 'bg-type-ice',
    name: '얼음',
    doubleDamage: ['fire', 'fighting', 'rock', 'steel'],
    halfDamage: ['ice'],
    noDamage: [],
  },
  dragon: {
    backgroundColor: 'bg-type-dragon',
    name: '드래곤',
    doubleDamage: ['ice', 'dragon', 'fairy'],
    halfDamage: ['fire', 'water', 'electric', 'grass'],
    noDamage: [],
  },
  dark: {
    backgroundColor: 'bg-type-dark',
    name: '악',
    doubleDamage: ['fighting', 'bug', 'fairy'],
    halfDamage: ['ghost', 'dark'],
    noDamage: ['psychic'],
  },
  fairy: {
    backgroundColor: 'bg-type-fairy',
    name: '페어리',
    doubleDamage: ['poison', 'steel'],
    halfDamage: ['fighting', 'bug', 'dark'],
    noDamage: ['dragon'],
  },
  stellar: {
    backgroundColor: 'bg-type-stellar',
    name: '스텔라',
    doubleDamage: [],
    halfDamage: [],
    noDamage: [],
  },
  unknown: {
    backgroundColor: 'bg-type-unknown',
    name: '???',
    doubleDamage: [],
    halfDamage: [],
    noDamage: [],
  },
};

export const POKEMON_TYPE_ARRAY: PokemonType[] = Object.keys(
  POKEMON_TYPE,
) as PokemonType[];

export const POKEMON_TYPE_ARRAY_KR = Object.keys(POKEMON_TYPE).map(
  (key) => (POKEMON_TYPE as any)[key].name,
);
