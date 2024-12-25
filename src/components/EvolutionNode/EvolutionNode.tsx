import { useEffect, useState } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { EvolutionDescription } from '../EvolutionDescription/EvolutionDescription';
import { FaArrowDown } from 'react-icons/fa';

import { EvolutionChainNodeProps, PokemonDataProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';
import extractPokemonDetails from '@/utils/extractPokemonDetails';
import Link from 'next/link';

export interface EvolutionNodeProps {
  node: EvolutionChainNodeProps;
  isLast: boolean;
}

export const EvolutionNode = ({ node, isLast }: EvolutionNodeProps) => {
  const id = extractIdFromUrl(node.species.url);

  const [pokemon, setPokemon] = useState<PokemonDataProps>();

  const {
    pokemonData,
    speciesData,
    isLoadingPokemon,
    isLoadingSpecies,
    isErrorPokemon,
    isErrorSpecies,
  } = usePokemonDetailQuery(String(id));

  useEffect(() => {
    if (pokemonData && speciesData)
      setPokemon(extractPokemonDetails([pokemonData, speciesData]));
  }, [pokemonData, speciesData]);

  if (isLoadingPokemon || isLoadingSpecies) return <div>Loading...</div>;
  if (isErrorPokemon) return <div>Error loading Pokemon data.</div>;
  if (isErrorSpecies) return <div>Error loading Pokemon species data.</div>;

  if (pokemon)
    return (
      <div className="flex flex-col items-center w-full">
        <Link href={`/pokemon/${id}`}>
          <img className="w-32 " alt={pokemon.name} src={pokemon.imageUrl} />
        </Link>
        <div className="relative text-right font-semibold w-full ">
          <div className="flex flex-col items-center mb-4">
            {!isLast && <FaArrowDown className="w-6 h-6" />}
          </div>
          {node.evolves_to.map((e, i) => (
            <div className="absolute top-1 left-[60%] whitespace-nowrap flex gap-1">
              <EvolutionDescription
                evolutionDetails={e.evolution_details}
                key={i}
              />
            </div>
          ))}
        </div>
      </div>
    );
};
