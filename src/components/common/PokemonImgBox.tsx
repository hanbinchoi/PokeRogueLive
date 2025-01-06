import { TypeBadge } from '../TypeBadge/TypeBadge';
import { LoadingComponent } from '../LoadingComponent';
import { ErrorComponent } from '../ErrorComponent';
import { AiFillSound } from 'react-icons/ai';

import { PokemonDetailProps } from '@/types/common';

export interface PokemonImgBoxProps {
  pokemon: PokemonDetailProps | null;
  id: number;
  usage: 'detail' | 'list' | 'power';
  isLoading?: boolean;
  isError?: boolean;
}

export const PokemonImgBox = ({
  pokemon,
  usage,
  id,
  isLoading,
  isError,
}: PokemonImgBoxProps) => {
  const handleAudioClick = () => {
    const audio = new Audio(pokemon?.cries);
    audio.play();
  };

  const renderList = () => (
    <div className="w-[150px] min-w-[150px] lg:min-w-[170px] h-[202px] min-h-[202px] lg:min-h-[212px] px-6 xl:px-8 py-4 text-sm font-bold flex flex-col justify-center items-center bg-white-100 border-2 rounded-lg">
      {isLoading ? (
        <LoadingComponent />
      ) : isError ? (
        <ErrorComponent message="Not Found" size="xsmall" />
      ) : (
        <>
          <div>{`No. ${String(id).padStart(3, '0')}`}</div>
          <img className="w-24" alt={pokemon?.name} src={pokemon?.imageUrl} />
          <div className="mb-2 text-lg">{pokemon?.name}</div>
          <div className="flex gap-2">
            {pokemon?.type.map((t, i) => (
              <TypeBadge key={`${t}-${i}`} type={t} size="small" />
            ))}
          </div>
        </>
      )}
    </div>
  );

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
    case 'list':
      return renderList();
    case 'detail':
      return renderDetail();
    case 'power':
      return renderPower();
    default:
      return null;
  }
};
