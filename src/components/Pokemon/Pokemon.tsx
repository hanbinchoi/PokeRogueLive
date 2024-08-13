import { useQuery } from '@tanstack/react-query';
import '../../styles/globals.css';
import { getPokemon } from '@/api/pokemon';

export interface PokemonProps {
  name: string;
}

export const Pokemon = ({ name }: PokemonProps) => {
  const { isLoading, error, data } = useQuery<any>({
    queryKey: [name],
    queryFn: () => getPokemon(name),
  });
  console.log();
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error</div>;
  return <div>{data?.names[2].name}</div>;
};
