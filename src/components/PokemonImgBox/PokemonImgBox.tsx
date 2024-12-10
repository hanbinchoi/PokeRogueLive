import '../../styles/globals.css';

import { TypeBadge } from '../TypeBadge/TypeBadge';
import { AiFillSound } from 'react-icons/ai';

import { PokemonDataProps } from '@/types/common';

export interface PokemonImgBoxProps {
  pokemon: PokemonDataProps;
  id: number;
  usage: 'detail' | 'list' | 'power';
}

export const PokemonImgBox = ({ pokemon, usage, id }: PokemonImgBoxProps) => {
  const handleAudioClick = () => {
    const audio = new Audio(pokemon.cries);
    audio.play();
  };

  if (pokemon)
    return usage === 'list' ? (
      <div className="px-8 py-4 text-sm font-bold flex flex-col items-center bg-white-100 border-2 rounded-lg">
        <div>{`No. ${String(id).padStart(3, '0')}`}</div>
        <img className="w-24" alt={pokemon.name} src={pokemon.imageUrl} />
        <div className="mb-2 text-lg">{pokemon.name}</div>
        <div className="flex gap-2">
          {pokemon.type.map((t, i) => (
            <TypeBadge key={t + i} type={t} size="small" />
          ))}
        </div>
      </div>
    ) : usage === 'detail' ? (
      <div className="flex flex-col items-center bg-white-100 border-2 rounded-lg">
        <div className="text-lg self-start font-bold flex justify-between w-full pt-3 px-5">
          <p>No. {String(id).padStart(3, '0')}</p>
          <AiFillSound
            className=" cursor-pointer"
            onClick={handleAudioClick}
            role="button"
            tabIndex={0}
          />
        </div>
        <img
          className="w-full max-w-[200px]"
          alt={pokemon.name}
          src={pokemon.imageUrl}
        />
      </div>
    ) : (
      <div className="px-6 py-4 font-bold flex flex-col items-center ">
        <img className="w-[200px]" alt={pokemon.name} src={pokemon.imageUrl} />
        <div className="text-lg mb-4">{pokemon.name}</div>
        <div className="flex gap-2">
          {pokemon.type.map((t, i) => (
            <TypeBadge key={t + i} type={t} size="medium" />
          ))}
        </div>
      </div>
    );
};
