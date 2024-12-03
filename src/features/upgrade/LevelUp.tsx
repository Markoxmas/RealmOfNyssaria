import { Button } from "@mui/material";
import { levelUp as levelUpAction } from "./upgradeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useEffect, useState } from "react";
import { Battle, updateBattleHeroes } from "../battle/battleSlice";
import isHeroInBattle from "../battle/lib/isHeroInBattle";
import getHeroesInBattle from "../battle/lib/getHeroesInBattle";
import { Currency } from "../inventory/types/itemSystem";
import getMaxLevelUpAmount from "./lib/getMaxLevelUpAmount";
import getHeroBattleId from "../battle/lib/getHeroBattleId";
import getHeroesFromBattle from "../battle/lib/getHeroesFromBattle";

export default function LevelUp() {
  const dispatch = useAppDispatch();
  const hero = useAppSelector((state) => state.upgrade.hero);
  const inventory = useAppSelector((state) => state.inventory);
  const { battles } = useAppSelector((state) => state.battle);
  const upgradeInfo = useAppSelector((state) => state.upgrade.upgradeInfo);
  const gold = inventory.items.find(
    (item) => item.registryId === "gold"
  ) as Currency;
  const [levelUpInfo, setLevelUpInfo] = useState(
    getMaxLevelUpAmount(hero, gold, upgradeInfo)
  );
  const [battle, setBattle] = useState<Battle | null>(null);

  const [battleUpdateTimeout, setBattleUpdateTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLevelUpInfo(getMaxLevelUpAmount(hero, gold, upgradeInfo));
  }, [hero?.level]);

  useEffect(() => {
    if (hero) {
      const battleId = getHeroBattleId(battles, hero._id);
      const battle = battles.find((battle) => battle._id === battleId);
      if (battle) {
        setBattle(battle);
      }
    }
  }, [hero]);

  const levelUp = (amount: number) => {
    if (hero) {
      dispatch(
        levelUpAction({
          heroId: hero._id,
          amount,
        })
      );
      if (isHeroInBattle(battles, hero._id)) {
        if (battleUpdateTimeout) {
          clearTimeout(battleUpdateTimeout);
        }
        if (battle) {
          setBattleUpdateTimeout(
            setTimeout(() => {
              dispatch(
                updateBattleHeroes({
                  battle_id: battle._id,
                  heroes_ids: getHeroesFromBattle(battle).map(
                    (hero) => hero._id
                  ),
                })
              );
            }, 3000)
          );
        }
      }
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
      <div>You have {gold?.quantity || 0} gold</div>
      {levelUpInfo && levelUpInfo.finalLevelUpAmount > 1 && (
        <Button variant="contained" onClick={() => levelUp(1)}>
          Level up 1 ({levelUpInfo?.requiredGold.one} gold)
        </Button>
      )}

      {levelUpInfo && levelUpInfo.finalLevelUpAmount > 9 && (
        <Button variant="contained" onClick={() => levelUp(10)}>
          Level up 10 ({levelUpInfo?.requiredGold.ten} gold)
        </Button>
      )}
      <Button
        variant="contained"
        disabled={levelUpInfo?.finalLevelUpAmount === 0}
        onClick={() => levelUp(levelUpInfo?.finalLevelUpAmount || 0)}
      >
        {levelUpInfo?.finalLevelUpAmount
          ? `Level up ${levelUpInfo.finalLevelUpAmount} (${levelUpInfo?.requiredGold.max} gold)`
          : "Max level"}
      </Button>
    </div>
  );
}
