import { fetchBattle } from "./battleSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import BattleTimer from "./BattleTimer";

export default function BattlePage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBattle());
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <BattleTimer />
    </div>
  );
}
