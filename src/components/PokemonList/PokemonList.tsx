import '../../styles/globals.css';

import { useQuery } from '@tanstack/react-query';

import { getPokemons } from '@/api/pokemon';

import usePokemonsStore from '@/stores/pokemonsStore';

import { PokemonCard } from '../Pokemon/PokemonCard';
import { PagingDocuments } from '../PagingDocuments/PagingDocuments';

import { PokemonsResponseProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';

export interface PokemonListProps {
  pokemonId: number | undefined | null;
}
export const PokemonList = ({ pokemonId }: PokemonListProps) => {
  const now = usePokemonsStore((state) => state.now);

  const { isLoading, error, data } = useQuery<PokemonsResponseProps>({
    queryKey: ['pokemons', now],
    queryFn: () => getPokemons(now),
    enabled: !pokemonId,
  });

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;

  if (data)
    return (
      <>
        <div className="grid grid-cols-5 py-2 px-14 gap-8">
          {pokemonId && <PokemonCard id={pokemonId} />}
          {!pokemonId &&
            data.data.map((pokemon) => (
              <PokemonCard
                key={extractIdFromUrl(pokemon.url)}
                id={extractIdFromUrl(pokemon.url) as number}
              />
            ))}
        </div>
        <PagingDocuments />
      </>
    );
};
