import { AiFillSound } from 'react-icons/ai';

import { TypeBadge } from './TypeBadge';

import { PokemonDetailProps } from '@/types/common';

export interface PokemonImgBoxProps {
  pokemon: PokemonDetailProps | null;
  id: number;
  usage: 'detail' | 'power';
  isLoading?: boolean;
  isError?: boolean;
}

export const PokemonImgBox = ({ pokemon, usage, id }: PokemonImgBoxProps) => {
  const handleAudioClick = () => {
    const audio = new Audio(pokemon?.cries);
    audio.play();
  };

  const renderDetail = () => (
    <div className="bg-white-100 border-2 rounded-lg ">
      <div className="flex justify-between items-center w-full pt-3 px-3 sm:px-5">
        <p className="text-xs sm:text-lg font-bold ">
          No. {String(id).padStart(3, '0')}
        </p>
        <AiFillSound
          className="text-base sm:text-lg cursor-pointer"
          onClick={handleAudioClick}
          role="button"
          tabIndex={0}
        />
      </div>
      <img className="w-full" alt={pokemon?.name} src={pokemon?.imageUrl} />
    </div>
  );

  const renderPower = () => (
    <div className="w-full max-w-[162px] font-bold flex flex-col items-center">
      <img
        className="w-full min-w-[120px] max-w-[162px]"
        alt={pokemon?.name}
        src={pokemon?.imageUrl}
      />
      <div className="text-base sm:text-lg mb-2 sm:mb-4">{pokemon?.name}</div>
      <div className="flex gap-2">
        {pokemon?.type.map((t, i) => (
          <TypeBadge key={`${t}-${i}`} type={t} size="small" />
        ))}
      </div>
    </div>
  );

  if (!pokemon) return null;

  switch (usage) {
    case 'detail':
      return renderDetail();
    case 'power':
      return renderPower();
    default:
      return null;
  }
};
