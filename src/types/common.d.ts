import exp from 'constants';

import { TypeBadge } from './../components/TypeBadge/TypeBadge';
import { Pokemon } from '../components/Pokemon/PokemonCard';
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

export type MenuItem = 'pokemon' | 'type-calculator' | 'power-calculator';

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
}

export interface PokemonDataProps {
  type: string[];
  name: string;
  imageUrl: string;
  pokedex: number;
}

export interface PokemonsResponseProps {
  count: number;
  data: DataProps[];
  next: string;
}

type PokemonType = keyof typeof POKEMON_TYPE;

interface PokemonTypeDetails {
  backgroundColor: string;
  name: PokemonType;
  doubleDamage: PokemonType[];
  halfDamage: PokemonType[];
  noDamage: PokemonType[];
}

type PokemonTypeProps = {
  [key: PokemonType]: PokemonTypeDetails;
};

type calcDefendTypeProps = Map<string, PokemonType[]> | null;
