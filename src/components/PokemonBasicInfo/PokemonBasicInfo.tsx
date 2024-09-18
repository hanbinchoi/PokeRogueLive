import '../../styles/globals.css';

import { TypeBadge } from '../TypeBadge/TypeBadge';

import { PokemonDataProps } from '@/types/common';

export interface PokemonBasicInfoProps {
  pokemon: PokemonDataProps;
}

export const PokemonBasicInfo = ({ pokemon }: PokemonBasicInfoProps) => {
  if (pokemon)
    return (
      <div className="flex flex-col gap-5">
        <div className="flex justify-between">
          <div>
            <h1 className="font-bold text-2xl">{`${pokemon.name}`}</h1>{' '}
          </div>
        </div>
        <div className="flex gap-3 mt-[-8px]">
          {pokemon.type.map((t) => (
            <TypeBadge size="small" type={t} />
          ))}
        </div>
        <div className="leading-5">{pokemon.flavor_text}</div>
        <div className="flex justify-between mt-2">
          <div className="flex flex-col gap-1">
            <span className="font-bold">분류</span>
            <span>{pokemon.genera}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">키</span>
            <span>{pokemon.height / 10}m</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">몸무게</span>
            <span>{pokemon.weight / 10}kg</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">획득 경험치</span>
            <span>{pokemon.base_experience}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">포획률</span>
            <span>{pokemon.capture_rate}</span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-bold">HP</span>
            <span>{pokemon.stats[0].base_stat}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">공격</span>
            <span>{pokemon.stats[1].base_stat}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">방어</span>
            <span>{pokemon.stats[2].base_stat}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">특수공격</span>
            <span>{pokemon.stats[3].base_stat}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">특수방어</span>
            <span>{pokemon.stats[4].base_stat}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">스피드</span>
            <span>{pokemon.stats[5].base_stat}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-bold">합계</span>
            <span>
              {pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)}
            </span>
          </div>
        </div>
      </div>
    );
};
