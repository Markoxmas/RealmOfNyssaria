import { useAppSelector } from "../../app/hooks";
import SummonedHero from "./SummonedHero";

export default function SummonHeroList() {
  const summonedHeroes = useAppSelector((state) => state.summon.summonedHeroes);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "10px",
        margin: "20px",
        maxHeight: "60vh",
        overflowY: "auto",
        overflowX: "hidden",
      }}
    >
      {summonedHeroes.map((hero) => (
        <SummonedHero hero={hero} />
      ))}
    </div>
  );
}
