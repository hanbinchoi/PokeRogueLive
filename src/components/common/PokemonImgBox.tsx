import { AiFillSound } from 'react-icons/ai';

import { TypeBadge } from './TypeBadge';

import { PokemonDetailProps } from '@/types/common';

export interface PokemonImgBoxProps {
  pokemon: PokemonDetailProps;
  usage: 'detail' | 'power';
}

/**
 * 포켓몬 이미지 박스 컴포넌트
 *
 * 사용 용도에 따라 두 가지 렌더링 방식이 제공됩니다:
 * - 'detail': 상세 정보 페이지에서 사용. 이미지, 고유 번호, 사운드 버튼 등을 표시
 * - 'power': 위력 페이지에서 사용. 이미지와 타입을 간단히 표시
 *
 * @param pokemon 포켓몬 기본 정보 (`PokemonDetailProps`)
 * @param usage 사용 용도 (`"detail"` | `"power"`)
 *
 */
export const PokemonImgBox = ({ pokemon, usage }: PokemonImgBoxProps) => {
  const handleAudioClick = () => {
    const audio = new Audio(pokemon?.cries);
    audio.play();
  };
  console.log(pokemon);
  const renderDetail = () => (
    <div className="bg-white-100 border-2 rounded-lg ">
      <div className="flex justify-between items-center w-full pt-3 px-3 sm:px-5">
        <p className="text-xs sm:text-lg font-bold ">
          No. {String(pokemon?.pokedex).padStart(3, '0')}
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

  switch (usage) {
    case 'detail':
      return renderDetail();
    case 'power':
      return renderPower();
    default:
      return null;
  }
};
