import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useState, useEffect } from "react";
import StarUpSlot from "./StarUpSlot";
import StarUpModal from "./StarUpModal";
import { Button } from "@mui/material";
import { UpgradeInfo, starUp } from "./upgradeSlice";
import { Hero } from "../heroes/heroesSlice";
import { Battle, updateBattleHeroes } from "../battle/battleSlice";
import getHeroesInBattle from "../battle/lib/getHeroesInBattle";
import getHeroBattleId from "../battle/lib/getHeroBattleId";
import getHeroesFromBattle from "../battle/lib/getHeroesFromBattle";

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
  const { battles } = useAppSelector((state) => state.battle);
  const [battle, setBattle] = useState<Battle | null>(null);

  useEffect(() => {
    if (hero) {
      const battleId = getHeroBattleId(battles, hero._id);
      const battle = battles.find((battle) => battle._id === battleId);
      if (battle) {
        setBattle(battle);
      }
    }
  }, [hero]);

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
            if (battle) {
              setTimeout(() => {
                dispatch(
                  updateBattleHeroes({
                    battle_id: battle._id,
                    heroes_ids: getHeroesFromBattle(battle).map(
                      (hero) => hero._id
                    ),
                  })
                );
              }, 2000);
            }
          }
        }}
      >
        Star up
      </Button>
    </div>
  );
}
