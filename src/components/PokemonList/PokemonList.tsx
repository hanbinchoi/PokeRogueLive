import { useQuery } from '@tanstack/react-query';

import { getPokemons } from '@/api/pokemon';

import { Pokemon } from '../Pokemon/Pokemon';

import { PokemonsResponseProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

export interface PokemonListProps {
  pokemonIdsList: number[] | null;
  now: number;
}

export const PokemonList = ({ pokemonIdsList, now }: PokemonListProps) => {
  const { isLoading, error, data } = useQuery<PokemonsResponseProps>({
    queryKey: ['pokemons', now],
    queryFn: () => getPokemons(now),
    enabled: !pokemonIdsList,
  });
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  if (data)
    return (
      <>
        <div className="grid grid-cols-5 py-2 px-14 gap-8">
          {pokemonIdsList &&
            pokemonIdsList.map((pokemonId) => (
              <Pokemon key={pokemonId} id={pokemonId} />
            ))}
          {!pokemonIdsList &&
            data.data.map((pokemon) => (
              <Pokemon
                key={extractIdFromUrl(pokemon.url)}
                id={extractIdFromUrl(pokemon.url) as number}
              />
            ))}
        </div>
      </>
    );
};
