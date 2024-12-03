import {
  fetchBattle,
  initModalAvailableHeroes,
  initModalBattleHeroes,
  openBattleModal,
  Battle as BattleType,
  claimLoot,
  openDropsModal,
} from "./battleSlice";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Battle from "./Battle";
import getHeroesFromBattle from "./lib/getHeroesFromBattle";
import getAvailableHeroes from "./lib/getAvailableHeroes";
import BattleModal from "./BattleModal";
import BattleLootModal from "./BattleLootModal";

export default function BattlePage() {
  const dispatch = useAppDispatch();
  const { battles } = useAppSelector((state) => state.battle);
  const { heroes } = useAppSelector((state) => state.heroes);
  const [battle, setBattle] = useState<BattleType>({
    _id: "",
    registryId: "",
    battleMilestones: [],
  });

  useEffect(() => {
    dispatch(fetchBattle());
  }, []);

  const openBattleModalHandler = (battle: BattleType) => {
    if (battles && heroes) {
      dispatch(initModalBattleHeroes(getHeroesFromBattle(battle)));
      dispatch(initModalAvailableHeroes(getAvailableHeroes(heroes, battles)));
    }
    setBattle(battle);
    dispatch(openBattleModal());
  };

  const claimLootHandler = (battle: BattleType) => {
    dispatch(claimLoot(battle._id));
    dispatch(openDropsModal());
  };

  return (
    <div>
      {battles.map((battle) => (
        <Battle
          battle={battle}
          openBattleModalHandler={openBattleModalHandler}
          claimLootHandler={claimLootHandler}
        />
      ))}
      <BattleModal battle={battle} />
      <BattleLootModal />
    </div>
  );
}
