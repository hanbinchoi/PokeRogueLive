import { PokemonType } from './common';

export interface CommonDataProps {
  name: string;
  url: string;
}

export interface FlavorTextEntryDataProps {
  flavor_text: string;
  language: CommonDataProps;
  version: CommonDataProps;
}

export interface GeneraDataProps {
  genus: string;
  language: CommonDataProps;
}

export interface PokemonNameDataProps {
  language: CommonDataProps;
  name: string;
}

export interface PokedexNumberDataProps {
  entry_number: string;
  pokedex: CommonDataProps;
}

export interface VarietyDataProps {
  is_default: boolean;
  pokemon: CommonDataProps;
}

export interface AbilityDataProps {
  ability: CommonDataProps;
  is_hidden: boolean;
  slot: number;
}

export interface CryDataProps {
  latest: string;
  legacy: string;
}

export interface AbilityNameDataProps {
  language: CommonDataProps;
  name: string;
}

export interface VersionGroupDetailDataProps {
  level_learned_at: number;
  move_learn_method: CommonDataProps;
  version_group: CommonDataProps;
}

export interface MoveDataProps {
  move: CommonDataProps;
  version_group_details: VersionGroupDetailDataProps[];
}

export interface SpriteDataProps {
  back_default: string;
  back_female?: string;
  back_shiny: string;
  back_shiny_female?: string;
  front_default: string;
  front_female?: string;
  front_shiny: string;
  front_shiny_female?: string;
}

export interface StatDataProps {
  base_stat: number;
  effort: number;
  stat: CommonDataProps;
}

export interface TypeDataProps {
  slot: number;
  type: CommonDataProps;
}

export interface AbilityDetailProps {
  id: number;
  name: string;
  names: PokemonNameDataProps[];
  flavor_text_entries: FlavorTextEntryDataProps[];
}

export interface ItemInfoProps {
  id: number;
  name: string;
  names: PokemonNameDataProps[];
}

export interface MoveDetailDataProps {
  accuracy: number;
  damage_class: CommonDataProps;
  flavor_text_entries: FlavorTextEntryDataProps[];
  name: string;
  names: PokemonNameDataProps[];
  power: number;
  pp: number;
  type: {
    name: PokemonType;
    url: string;
  };
}

export interface StatDataProps {
  base_stat: number;
  effort: number;
  stat: CommonDataProps;
}

export interface EvolutionChainNodeDataProps {
  is_baby: boolean;
  species: CommonDataProps;
  evolution_details: EvolutionDetailDataProps[];
  evolves_to: EvolutionChainNodeDataProps[];
}

export interface EvolutionChainDataProps {
  id: number;
  baby_trigger_item: string | null;
  chain: EvolutionChainNodeDataProps;
}

export interface PokemonsDataProps {
  count: number;
  data: CommonDataProps[];
  next: string;
}

export interface PokemonSpeciesDataProps {
  capture_rate: number;
  evolution_chain: {
    url: string;
  };
  evolves_from_species?: string;
  flavor_text_entries: FlavorTextEntryDataProps[];
  genera: GeneraDataProps[];
  generation: CommonDataProps;
  id: number;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: PokemonNameDataProps[];
  order: number;
  pokedex_numbers: PokedexNumberDataProps[];
  varieties: VarietyDataProps[];
}

export interface PokemonDetailDataProps {
  abilities: AbilityDataProps[];
  base_experience: number;
  cries: CryDataProps;
  forms: CommonDataProps[];
  height: number;
  id: number;
  is_default: true;
  moves: MoveDataProps[];
  name: string;
  order: number;
  species: CommonDataProps;
  sprites: SpriteDataProps;
  stats: StatDataProps[];
  types: TypeDataProps[];
  weight: number;
  evolution_chain: string;
  flavorText: string;
}

export interface EvolutionDetailDataProps {
  gender: number | null;
  held_item: string | null;
  item: CommonDataProps | null;
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
