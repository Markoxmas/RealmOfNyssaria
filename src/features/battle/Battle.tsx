import { Button } from "@mui/material";
import BattleHeroes from "./BattleHeroes";
import BattleTimer from "./BattleTimer";
import { Battle as BattleType } from "./battleSlice";

export default function Battle({
  battle,
  openBattleModalHandler,
  claimLootHandler,
}: {
  battle: BattleType;
  openBattleModalHandler: (battle: BattleType) => void;
  claimLootHandler: (battle: BattleType) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <BattleTimer battle={battle} />
      <BattleHeroes battle={battle} />
      <Button
        variant="contained"
        onClick={() => openBattleModalHandler(battle)}
        style={{ marginTop: 20 }}
      >
        Modify heroes
      </Button>
      <Button onClick={() => claimLootHandler(battle)} variant="contained">
        Claim loot
      </Button>
    </div>
  );
}
