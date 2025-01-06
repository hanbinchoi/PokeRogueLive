import { useEffect, useState } from 'react';
import Link from 'next/link';

import usePokemonDetailQuery from '@/hooks/usePokemonDetailQuery';

import { EvolutionDescription } from '../EvolutionDescription/EvolutionDescription';
import { FaArrowDown } from 'react-icons/fa';

import { EvolutionChainNodeProps, PokemonDetailProps } from '@/types/common';

import extractIdFromUrl from '@/utils/extractIdFromUrl';
import extractPokemonDetails from '@/utils/extractPokemonDetails';

export interface EvolutionNodeProps {
  node: EvolutionChainNodeProps;
  isLast: boolean;
}

export const EvolutionNode = ({ node, isLast }: EvolutionNodeProps) => {
  const id = extractIdFromUrl(node.species.url);

  const [pokemon, setPokemon] = useState<PokemonDetailProps>();

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
      setPokemon(extractPokemonDetails(pokemonData, speciesData));
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
        <div className="relative text-xs min-[480px]:text-sm text-right font-semibold w-full ">
          <div className="flex flex-col items-center mb-4">
            {!isLast && (
              <FaArrowDown className="w-4 h-4 min-[480px]:w-6 min-[480px]:h-6" />
            )}
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
