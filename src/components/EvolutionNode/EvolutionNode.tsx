import '../../styles/globals.css';

import { useEffect, useState } from 'react';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { EvolutionChainNodeProps, PokemonDataProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';
import extractPokemonDetails from '@/utils/extractPokemonDetails';
import getEvolutionDescription from '@/utils/getEvolutionDescription';

import { FaArrowDown } from 'react-icons/fa';

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
        <img className="w-32" alt={pokemon.name} src={pokemon.imageUrl} />
        <div className="relative text-right font-semibold w-full ">
          <div className="flex flex-col items-center mb-4">
            {!isLast && <FaArrowDown className="w-6 h-6" />}
          </div>
          {node.evolves_to.map((e) => (
            <div className="absolute top-1 left-[60%] whitespace-nowrap">
              {getEvolutionDescription(e.evolution_details)}
            </div>
          ))}
        </div>
      </div>
    );
};
