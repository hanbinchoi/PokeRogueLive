import { CommonDataProps, EvolutionDetailDataProps } from './data';

import {
  WEATHER,
  FIELD,
  PokemonTypeName,
  SpecialDefendAbility,
  SpecialAttackAbility,
  SpecialAttackMove,
} from '@/constants/contents';

export interface DefaultProps {
  className?: string;
}
export interface InputValues {
  keyword: string;
  move: string;
  ability: string;
}

export type ButtonSize = 'small' | 'medium' | 'large';

export type typeCalcMode = 'defend' | 'attack';

export type checkboxUsage = 'attackMove' | 'attackAbility';

export type PokemonType = PokemonTypeName;

export interface PokemonDetailProps {
  type: PokemonType[];
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

export interface MoveInfoProps {
  krName: string;
  move: CommonDataProps;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: CommonDataProps;
  }[];
}

export interface PokemonTypeDetail {
  backgroundColor: string;
  name: string;
  doubleDamage: PokemonType[];
  halfDamage: PokemonType[];
  noDamage: PokemonType[];
}

export interface PokemonTypesData
  extends Record<PokemonType, PokemonTypeDetail> {}

export type calcResultType = Map<number, PokemonType[]> | null;

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

export type FieldType = FIELD;

export type WeatherType = WEATHER;

export type SpecialAttackMoveType = SpecialAttackMove;

export type SpecialAttackAbilityType = SpecialAttackAbility;

export type SpecialDefendAbilityType = SpecialDefendAbility;

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
