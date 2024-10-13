import { fetchBattle } from "./battleSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import BattleTimer from "./BattleTimer";
import BattleHeroes from "./BattleHeroes";
import BattleModal from "./BattleModal";
import { Button } from "@mui/material";
import { openBattleModal } from "./battleSlice";

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
      <Button
        variant="contained"
        onClick={() => dispatch(openBattleModal())}
        style={{ marginTop: 20 }}
      >
        Modify heroes
      </Button>
      <BattleModal />
      <Button variant="contained">Claim loot</Button>
    </div>
  );
}
