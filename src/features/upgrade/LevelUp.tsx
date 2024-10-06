import { Button } from "@mui/material";
import { levelUp as levelUpAction } from "./upgradeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function LevelUp() {
  const dispatch = useAppDispatch();
  const hero = useAppSelector((state) => state.upgrade.hero);
  const inventory = useAppSelector((state) => state.inventory);

  const levelUp = (amount: number) => {
    if (hero) {
      dispatch(
        levelUpAction({
          heroId: hero._id,
          amount,
          inventoryId: inventory.id,
        })
      );
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "10px",
        gap: "5px",
      }}
    >
      <Button variant="contained" onClick={() => levelUp(1)}>
        Level up 1
      </Button>
      <Button variant="contained" onClick={() => levelUp(10)}>
        Level up 10
      </Button>
      <Button variant="contained" onClick={() => levelUp(15)}>
        Level up max
      </Button>
    </div>
  );
}
