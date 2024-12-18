interface PowerDamageValueProps {
  damage: number;
  hp: number | undefined;
}

export const PowerDamageValue = ({ damage, hp }: PowerDamageValueProps) => {
  if (!hp) return;
  if (damage / hp > 0.66) return <p className="text-red-30">{damage}</p>;
  if (damage / hp > 0.33) return <p>{damage}</p>;
  return <p className="text-blue-30">{damage}</p>;
};
