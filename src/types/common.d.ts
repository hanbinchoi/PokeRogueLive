import {
  AbilityDataProps,
  CommonDataProps,
  MoveDataProps,
  StatDataProps,
} from './data';

import {
  Weather,
  Field,
  PokemonTypeName,
  SpecialDefendAbility,
  SpecialAttackAbility,
  SpecialAttackMove,
  BattleRole,
  SelectUsage,
  AttackOptionUsage,
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

export type PokemonImgBoxUsage = 'detail' | 'power';

export type BattleRoleType = BattleRole;

export type checkboxUsage = 'attackMove' | 'attackAbility';

export type AttackOptionUsageType = AttackOptionUsage;

export type SelectUsageType = SelectUsage;

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

export type FieldType = Field;

export type WeatherType = Weather;

export type SpecialAttackMoveType = SpecialAttackMove;

export type SpecialAttackAbilityType = SpecialAttackAbility;

export type SpecialDefendAbilityType = SpecialDefendAbility;

export type MoveStatusKey = 'physical' | 'special' | 'status';

export type StatKey =
  | 'lv'
  | 'hp'
  | 'attack'
  | 'defense'
  | 'special-attack'
  | 'special-defense'
  | 'speed';

export type PokemonStatsProps = Record<StatKey, number>;

export type InfoKey =
  | 'genera'
  | 'height'
  | 'weight'
  | 'base_experience'
  | 'capture_rate';

export type PokemonInfoProps = Record<InfoKey, string | number>;

export interface DamageContextProps {
  sameTypeEffectiveness: null | string;
  defendTypeEffectiveness: null | string;
  mod1: null | string;
  fieldValue: null | string;
  weaknessPower: null | string;
  random: string;
}
