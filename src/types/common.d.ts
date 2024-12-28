import { TypeBadge } from './../components/TypeBadge/TypeBadge';
import { Pokemon } from '../components/Pokemon/Pokemon';

import { POKEMON_TYPE } from '@/constants/contents';

export interface DefaultProps {
  className?: string;
}

export type addPrefixToHandler<T, P extends string> = {
  [K in keyof T as K extends string
    ? `${P}${K}`
    : never]: React.MouseEventHandler<HTMLElement>;
};

export type ButtonSize = 'small' | 'medium' | 'large';

export type SearchInputSize = 'small' | 'medium';

export interface InputValues {
  keyword: string;
  move: string;
  ability: string;
}

export type selectUsage = 'defenceAbility' | 'teraType';

export type checkboxUsage = 'attackMove' | 'attackAbility';

export interface DataProps {
  name: string;
  url: string;
}

export interface FlavorTextEntryProps {
  flavor_text: string;
  language: DataProps;
  version: DataProps;
}

export interface GeneraProps {
  genus: string;
  language: DataProps;
}

export interface PokemonNameProps {
  language: DataProps;
  name: string;
}

export interface PokedexNumbersProps {
  entry_number: string;
  pokedex: DataProps;
}

export interface VarietiesProps {
  is_default: boolean;
  pokemon: DataProps;
}

export interface PokemonSpeciesProps {
  capture_rate: number; // 포획률
  evolution_chain: {
    // 진화 사슬
    url: string;
  };
  evolves_from_species?: string; // 진화 전
  flavor_text_entries: FlavorTextEntryProps[]; // 설명

  genera: GeneraProps[]; // 종류
  generation: DataProps; // 세대
  id: number; // 아이디
  is_legendary: boolean; // 전설인지
  is_mythical: boolean; // 환상인지
  name: string;
  names: PokemonNameProps[];
  order: number; // 정렬순서
  pokedex_numbers: PokedexNumbersProps[]; // 도감번호

  varieties: VarietiesProps[]; // 다른 형태, 종
}

export interface AbilityProps {
  ability: DataProps;
  is_hidden: boolean;
  slot: number;
}

export interface CryProps {
  latest: string;
  legacy: string;
}

export interface VersionGroupDetailProps {
  level_learned_at: number;
  move_learn_method: DataProps;
  version_group: DataProps;
}

export interface MoveProps {
  move: DataProps;
  version_group_details: VersionGroupDetailProps[];
}

export interface SpriteProps {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}

export interface StatProps {
  base_stat: number;
  effort: number;
  stat: DataProps;
}

export interface TypeProps {
  slot: number;
  type: DataProps;
}

export interface PokemonDetailProps {
  abilities: AbilityProps[]; // 어빌리티 목록
  base_experience: number; // 얻는 경험치
  cries: CryProps; // 울음 소리
  forms: DataProps[]; // 폼
  height: number; // 키
  held_items: []; // 장착할 수 있는 아이템
  id: 1;
  is_default: true;
  moves: MoveProps[]; // 배울 수 있는 기술 목록
  name: string;
  order: number;
  species: DataProps;
  sprites: SpriteProps;
  stats: StatProps[];
  types: TypeProps[];
  weight: number;
  evolution_chain: string;
  flavorText: string;
}

export interface AbilityInfoProps {
  ability: DataProps;
  is_hidden: Boolean;
  slot: number;
}

export interface MoveInfoProps {
  krName: string;
  move: DataProps;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: DataProps;
  }[];
}

export interface StatInfoProps {
  base_stat: number;
  effort: number;
  stat: DataProps;
}

export interface PokemonDataProps {
  type: PokemonType[];
  name: string;
  imageUrl: string;
  pokedex: number;
  abilitiesInfo: AbilityInfoProps[];
  base_experience: number;
  cries: string;
  height: number;
  moves: MoveProps[];
  stats: StatInfoProps[];
  weight: number;
  capture_rate: number;
  evolution_chain: string;
  flavor_text: string;
  genera: string;
  is_legendary: boolean;
  is_mythical: boolean;
}

export interface PokemonsResponseProps {
  count: number;
  data: DataProps[];
  next: string;
}

export type PokemonType = keyof typeof POKEMON_TYPE;

export interface PokemonTypeDetails {
  backgroundColor: string;
  name: PokemonType;
  doubleDamage: PokemonType[];
  halfDamage: PokemonType[];
  noDamage: PokemonType[];
}

export type PokemonTypeProps = {
  [key: PokemonType]: PokemonTypeDetails;
};

export type calcDefendTypeProps = Map<string, PokemonType[]> | null;

export interface EvolutionDetailProps {
  gender: number | null;
  held_item: string | null;
  item: DataProps | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: string | null;
  party_type: string | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: string | null;
  trigger: {
    name: string;
    url: string;
  };
  turn_upside_down: boolean;
}

export interface EvolutionChainNodeProps {
  is_baby: boolean;
  species: DataProps;
  evolution_details: EvolutionDetailProps[];
  evolves_to: EvolutionChainNodeProps[];
}

export interface EvolutionChainProps {
  id: number;
  baby_trigger_item: string | null;
  chain: EvolutionChainNodeProps;
}

export interface EffectEntryProps {
  effect: string;
  short_effect: string;
  language: DataProps;
}

export interface AbilityDetailProps {
  id: number;
  name: string;
  names: PokemonNameProps[];
  flavor_text_entries: FlavorTextEntryProps[];
}

export interface AbilityNameProps {
  language: DataProps;
  name: string;
}
export interface ItemInfoProps {
  id: number;
  name: string;
  names: PokemonNameProps[];
}

export interface MoveTypeProps {
  name: PokemonType;
  url: string;
}

export interface MoveDetailProps {
  accuracy: number;
  damage_class: DataProps;
  flavor_text_entries: FlavorTextEntryProps[];
  name: string;
  names: PokemonNameProps[];
  power: number;
  pp: number;
  type: MoveTypeProps;
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
