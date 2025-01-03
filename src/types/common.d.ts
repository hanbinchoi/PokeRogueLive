import { CommonDataProps, EvolutionDetailDataProps } from './data';

import { FIELD_LIST, WEATHER_LIST } from '@/constants/contents';

export interface DefaultProps {
  className?: string;
}

export type ButtonSize = 'small' | 'medium' | 'large';

export interface InputValues {
  keyword: string;
  move: string;
  ability: string;
}

export type typeCalcMode = 'defend' | 'attack';

export type selectUsage = 'defenceAbility' | 'teraType';

export type checkboxUsage = 'attackMove' | 'attackAbility';

export type PokemonTypeName =
  | 'normal'
  | 'fighting'
  | 'flying'
  | 'poison'
  | 'ground'
  | 'rock'
  | 'bug'
  | 'ghost'
  | 'steel'
  | 'fire'
  | 'water'
  | 'grass'
  | 'electric'
  | 'psychic'
  | 'ice'
  | 'dragon'
  | 'dark'
  | 'fairy'
  | 'stellar'
  | 'unknown';

export interface PokemonDetailProps {
  type: PokemonTypeName[];
  name: string;
  imageUrl: string;
  pokedex: number;
  abilitiesInfo: AbilityDataProps[];
  base_experience: number;
  cries: string;
  height: number;
  moves: MoveDataProps[];
  stats: StatDataProps[];
  weight: number;
  capture_rate: number;
  evolution_chain: string;
  flavor_text: string;
  genera: string;
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface SelectOptionProps {
  label: string;
  options: string[];
  set: (value: string) => void;
}

export interface MoveInfoProps {
  krName: string;
  move: CommonDataProps;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: CommonDataProps;
  }[];
}

export interface PokemonTypeDetails {
  backgroundColor: string;
  name: string;
  doubleDamage: PokemonTypeName[];
  halfDamage: PokemonTypeName[];
  noDamage: PokemonTypeName[];
  doubleEffect: PokemonTypeName[];
  halfEffect: PokemonTypeName[];
  noEffect: PokemonTypeName[];
  normalEffect: PokemonTypeName[];
}

export interface PokemonTypesData
  extends Record<PokemonTypeName, PokemonTypeDetails> {}

export type calcResultType = Map<number, PokemonTypeName[]> | null;

export interface EvolutionChainNodeProps {
  is_baby: boolean;
  species: CommonDataProps;
  evolution_details: EvolutionDetailDataProps[];
  evolves_to: EvolutionChainNodeProps[];
}

export interface EvolutionChainProps {
  id: number;
  baby_trigger_item: string | null;
  chain: EvolutionChainNodeProps;
}

export type FieldType = (typeof FIELD_LIST)[number];

export type WeatherType = (typeof WEATHER_LIST)[number];

export type StatKey =
  | 'lv'
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

export interface PokemonStatsProps {
  lv: number;
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export interface DamageContextProps {
  sameTypeEffectiveness: null | string;
  defendTypeEffectiveness: null | string;
  mod1: null | string;
  fieldValue: null | string;
  weaknessPower: null | string;
  random: string;
}
