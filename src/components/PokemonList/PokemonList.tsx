import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import usePokemonsStore from '@/stores/pokemonsStore';

import { getPokemons } from '@/api/pokemon';

import { Pokemon } from '../Pokemon/Pokemon';
import { LoadingComponent } from '../LoadingComponent/LoadingComponent';
import { PagingDocuments } from '../PagingDocuments/PagingDocuments';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';

import { PokemonsResponseProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

export interface PokemonListProps {
  pokemonIdsList: number[] | null | undefined;
  now: number;
}

export const PokemonList = ({ pokemonIdsList, now }: PokemonListProps) => {
  const { limit, setLimit, total, setNow, isSearch } = usePokemonsStore();

  const { isLoading, error, data } = useQuery<PokemonsResponseProps>({
    queryKey: ['pokemons', now, limit],
    queryFn: () => getPokemons(now, limit),
    enabled: !pokemonIdsList?.length,
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setLimit(10);
      } else if (window.innerWidth >= 1024) {
        setLimit(8);
      } else if (window.innerWidth >= 640) {
        setLimit(6);
      } else if (window.innerWidth >= 480) {
        setLimit(4);
      } else {
        setLimit(2);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const renderError = () => {
    if (isLoading)
      return (
        <div className="w-full h-full">
          <LoadingComponent />
        </div>
      );
    if (error || (isSearch && !pokemonIdsList?.length))
      return (
        <div className="w-full h-full">
          <ErrorComponent message="포켓몬을 찾을 수 없어요." />;
        </div>
      );

    return null;
  };

  const renderPokemonList = () => {
    if (isSearch && pokemonIdsList?.length) {
      return pokemonIdsList.map((pokemonId) => (
        <Pokemon key={pokemonId} id={pokemonId} />
      ));
    }

    if (!isSearch && data?.data) {
      return data.data.map((pokemon) => (
        <Pokemon
          key={extractIdFromUrl(pokemon.url)}
          id={extractIdFromUrl(pokemon.url)}
        />
      ));
    }

    return null;
  };

  return (
    <div className="flex-grow flex flex-col w-full">
      {renderError()}

      <div className="grid  py-2 px-14 gap-8 grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {renderPokemonList()}
      </div>

      <PagingDocuments
        now={now}
        total={total}
        setNow={setNow}
        pageSize={limit}
      />
    </div>
  );
};
