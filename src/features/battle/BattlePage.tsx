import { fetchBattle } from "./battleSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import BattleTimer from "./BattleTimer";
import BattleHeroes from "./BattleHeroes";

export default function BattlePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBattle());
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <BattleTimer />
      <BattleHeroes />
    </div>
  );
}
