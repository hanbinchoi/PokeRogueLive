'use client';

import { useState } from 'react';

import { FaAngleLeft } from '@react-icons/all-files/fa/FaAngleLeft';
import { FaAngleRight } from '@react-icons/all-files/fa/FaAngleRight';

interface ImageSliderProps {
  images: string[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [slideIndex, setSlideIndex] = useState(0);

  const moveToPrevSlide = () => {
    setSlideIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const moveToNextSlide = () => {
    setSlideIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const moveDot = (index: number) => {
    setSlideIndex(index);
  };
  return (
    <div className="relative w-[320px] h-[390px] md:w-[720px] md:h-[400px] mx-auto overflow-hidden p-4 rounded-2xl bg-gray-10">
      <div
        onClick={moveToPrevSlide}
        className="absolute top-0 bottom-0 left-0 md:left-4 m-auto bg-pink-300 flex items-center justify-center rounded-full cursor-pointer z-10">
        <FaAngleLeft className="w-5 h-5 md:w-7 md:h-7" />
      </div>

      <div
        className="flex h-[330px] md:h-[360px] transition-transform duration-300 ease-in-out"
        style={{
          transform: `translateX(${slideIndex * -100}%)`,
        }}>
        {images.map((img, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={img}
              alt={`Slide ${index}`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div
        onClick={moveToNextSlide}
        className="absolute top-0 bottom-0 right-0 md:right-4 m-auto w-9 h-9 bg-pink-300 flex items-center justify-center rounded-full cursor-pointer z-10">
        <FaAngleRight className="w-5 h-5 md:w-7 md:h-7" />
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2  py-1  rounded ">
        {images.map((character, index) => (
          <div
            key={index}
            onClick={() => moveDot(index)}
            className={`w-2 h-2 rounded-full cursor-pointer ${
              index === slideIndex ? 'bg-blue-10' : 'bg-gray-50'
            }`}></div>
        ))}
      </div>
    </div>
  );
}
