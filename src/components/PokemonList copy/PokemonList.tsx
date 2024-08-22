'use client';

import { useQuery } from '@tanstack/react-query';
import '../../styles/globals.css';

import { getPokemons } from '@/api/pokemon';

import { Pokemon } from '../Pokemon/PokemonCard';

import { DataProps, PokemonsResponseProps } from '@/types/common';
import { useEffect, useState } from 'react';
import usePokemonsStore from '@/stores/pokemonsStore';
import {
  FaAngleLeft,
  FaAnglesLeft,
  FaAngleRight,
  FaAnglesRight,
} from 'react-icons/fa6';

export const PokemonList = ({}) => {
  const { isLoading, error, data } = useQuery<PokemonsResponseProps>({
    queryKey: ['pokemons'],
    queryFn: getPokemons,
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return (
    <>
      {
        <div className="grid grid-cols-5 py-2 px-14 gap-8">
          {data &&
            data.data.map((pokemon) => (
              <Pokemon key={pokemon.name} name={pokemon.name} />
            ))}
        </div>
      }

      <ul className="mt-5 px-14 text-lg flex justify-center items-center gap-2">
        {now > 1 && (
          <>
            <li>
              <FaAnglesLeft className="w-3" />
            </li>
            <li>
              <FaAngleLeft className="w-2" />
            </li>
          </>
        )}

        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
        {!last && (
          <>
            <li>
              <FaAngleRight className="w-2" />
            </li>
            <li>
              <FaAnglesRight className="w-3" />
            </li>
          </>
        )}
      </ul>
    </>
  );
};
