import calcPower from './calcPower';

import getPokemonStatMap from './getPokemonStatMap';

export default function getDamages({
  attackPokemon,
  defendPokemon,
  MoveDetail,
  weather,
  field,
  isWeaknessHit,
}: {
  attackPokemon: any;
  defendPokemon: any;
  MoveDetail: any;
  weather: string;
  field: string;
  isWeaknessHit: boolean;
}) {
  if (!attackPokemon || !defendPokemon || !MoveDetail) return null;

  const attackPokemonStats = getPokemonStatMap(attackPokemon);
  const defendPokemonStats = getPokemonStatMap(defendPokemon);

  return calcPower({
    attackPokemon,
    defendPokemon,
    attackPokemonStats,
    defendPokemonStats,
    MoveDetail,
    weather,
    field,
    isWeaknessHit,
  });
}
