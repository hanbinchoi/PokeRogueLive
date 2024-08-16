import '../../styles/globals.css';

import { useQueries } from '@tanstack/react-query';

import { getPokemon, getPokemonSpecies } from '@/api/pokemon';
import { TypeBadge } from '../TypeBadge/TypeBadge';

export interface PokemonProps {
  name: string;
}

export const Pokemon = ({ name }: PokemonProps) => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['detail', name],
        queryFn: () => getPokemon(name),
      },
      {
        queryKey: ['species', name],
        queryFn: () => getPokemonSpecies(name),
      },
    ],
  });

  const isLoading = results.some((result) => result.isLoading);
  const isError = results.some((result) => result.isError);

  const dummy = {
    name: '이상해씨',
    imageUrl:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    type: ['grass', 'poison', 'rock'],
    pokedex: 1,
  };

  console.log(results);

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>error</div>;
  return (
    <div>
      <div>{`No. ${String(dummy.pokedex).padStart(3, '0')}`}</div>
      <img alt={name} src={dummy.imageUrl} />
      <div>{dummy.name}</div>
      <div>
        {dummy.type.map((t, i) => (
          <TypeBadge key={t + i} type={t} size="small" />
        ))}
      </div>
    </div>
  );
};
