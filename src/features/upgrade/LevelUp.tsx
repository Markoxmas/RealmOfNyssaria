import { Button } from "@mui/material";
import { UpgradeInfo, levelUp as levelUpAction } from "./upgradeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Hero } from "../heroes/heroesSlice";
import { useEffect, useState } from "react";

export const maxLevelUpAmount = (
  hero: Hero | null,
  gold: number,
  upgradeInfo: UpgradeInfo
) => {
  if (hero === null) {
    return;
  }

  let requiredGold = {
    one: 0,
    ten: 0,
    max: 0,
  };
  let finalLevelUpAmount = 0;
  const maxLevelUpAmount = upgradeInfo.maxLevel - hero.level;
  for (let i = 0; i < maxLevelUpAmount; i++) {
    requiredGold.max += Math.floor(
      upgradeInfo.levelUpBase *
        upgradeInfo.levelUpMultiplier ** (hero.level + i - 1)
    );
    if (requiredGold.max <= gold) {
      finalLevelUpAmount++;
      if (i === 0) {
        requiredGold.one = requiredGold.max;
      }
      if (i === 9) {
        requiredGold.ten = requiredGold.max;
      }
    } else {
      break;
    }
  }

  return {
    finalLevelUpAmount,
    requiredGold,
  };
};

export default function LevelUp() {
  const dispatch = useAppDispatch();
  const hero = useAppSelector((state) => state.upgrade.hero);
  const inventory = useAppSelector((state) => state.inventory);
  const inventoryItems = inventory.items;
  const upgradeInfo = useAppSelector((state) => state.upgrade.upgradeInfo);
  const gold = inventoryItems.find((item) => item.id === 1)?.quantity || 0;
  const [levelUpInfo, setLevelUpInfo] = useState(
    maxLevelUpAmount(hero, gold, upgradeInfo)
  );

  useEffect(() => {
    setLevelUpInfo(maxLevelUpAmount(hero, gold, upgradeInfo));
  }, [hero?.level]);

  const levelUp = (amount: number) => {
    if (hero) {
      dispatch(
        levelUpAction({
          heroId: hero._id,
          amount,
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
      <div>You have {gold} gold</div>
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
