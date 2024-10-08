import { useAppDispatch, useAppSelector } from "../../app/hooks";
import StarUpSlot from "./StarUpSlot";
import StarUpModal from "./StarUpModal";
import { Button } from "@mui/material";
import { UpgradeInfo, starUp } from "./upgradeSlice";
import { Hero } from "../heroes/heroesSlice";

function areSacrificesFulfilled(
  upgradeInfo: UpgradeInfo,
  chosenSacrifices: Hero[][]
) {
  for (let i = 0; i < upgradeInfo.sacrifices.length; i++) {
    const sacrifice = upgradeInfo.sacrifices[i];
    if (sacrifice !== null) {
      if (chosenSacrifices[i].length < sacrifice.amount) {
        return false;
      }
    }
  }
  return true;
}

export default function StarUp() {
  const dispatch = useAppDispatch();
  const { upgradeInfo, chosenSacrifices, hero } = useAppSelector(
    (state) => state.upgrade
  );

  return (
    <div
      style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}
    >
      {upgradeInfo?.sacrifices?.map((sacrifice, i) => {
        return sacrifice !== null ? (
          <StarUpSlot sacrifice={sacrifice} slot={i} />
        ) : (
          <></>
        );
      })}
      <StarUpModal />
      <Button
        variant="contained"
        disabled={!areSacrificesFulfilled(upgradeInfo, chosenSacrifices)}
        onClick={() => {
          if (hero) {
            dispatch(
              starUp({
                heroId: hero._id,
                sacrificeIds: chosenSacrifices.flat().map((hero) => hero._id),
              })
            );
          }
        }}
      >
        Star up
      </Button>
    </div>
  );
}
