'use client';

import { useState } from 'react';

import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';
import { EvolutionNode } from './EvolutionNode';

import { EvolutionChainNodeDataProps } from '@/types/data';

interface EvolutionSliderProps {
  evolutionNodes: EvolutionChainNodeDataProps[][];
}

/**
 * 각 진화별 진화 경로를 슬라이드 형식으로 보여주기 위한 컴포넌트.
 *
 * - 진화 경로는 1개의 노드로 취급합니다. 여기서 진화 경로는 배열 형태로 저장됩니다. (ex. [이브이, 쥬피썬더])
 * - 진화별 진화 경로는 노드들의 묶음으로서 2차원 배열 형태로 저장됩니다. (ex. 이브이의 진화별 진화 경로 = [ [이브이, 쥬피썬더], [이브이, 샤미드] ...] )
 *
 *
 * @param evolutionNodes - 각 진화 정보 별 진화경로(노드)를 담은 배열 (EvolutionChainNodeDataProps[][])
 */
export function EvolutionSlider({ evolutionNodes }: EvolutionSliderProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const moveToPrevSlide = () => {
    setSlideIndex((prev) =>
      prev === 0 ? evolutionNodes.length - 1 : prev - 1,
    );
  };

  const moveToNextSlide = () => {
    setSlideIndex((prev) =>
      prev === evolutionNodes.length - 1 ? 0 : prev + 1,
    );
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };
  return (
    <div className="relative min-w-[220px] mx-auto overflow-hidden rounded-2xl">
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${slideIndex * -100}%)`,
        }}>
        {evolutionNodes.map((nodes, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {nodes.map((n, i) => (
              <EvolutionNode key={`${index}-${i}`} node={n} isFirst={i === 0} />
            ))}
          </div>
        ))}
      </div>

      {evolutionNodes.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center items-center space-x-2  py-1  rounded ">
          <FaAngleLeft
            className="w-4 h-4 md:w-5 md:h-5"
            onClick={moveToPrevSlide}
          />

          {evolutionNodes.map((nodes, index) => (
            <div
              key={index}
              onClick={() => moveDot(index)}
              className={`w-3 h-3 rounded-full cursor-pointer ${
                index === slideIndex ? 'bg-blue-10' : 'bg-gray-50'
              }`}></div>
          ))}

          <FaAngleRight
            onClick={moveToNextSlide}
            className="w-4 h-4 md:w-5 md:h-5"
          />
        </div>
      )}
    </div>
  );
}
