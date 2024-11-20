import { useEffect } from "react";
import Navigation from "./features/navigation/Navigation";
import HeroesPage from "./features/heroes/HeroesPage";
import SummonPage from "./features/summon/SummonPage";
import UpgradePage from "./features/upgrade/UpgradePage";
import BattlePage from "./features/battle/BattlePage";
import AuthScreen from "./features/user/AuthScreen";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { NavigationTabs } from "./features/navigation/navigationSlice";
import { getInventory } from "./features/inventory/inventorySlice";

function App() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.navigation.tab);
  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getInventory());
  }, []);
  return (
    <>
      {user.userId === null && <AuthScreen />}
      {user.userId && <Navigation />}
      {tab === NavigationTabs.HEROES && user.userId && <HeroesPage />}
      {tab === NavigationTabs.SUMMON && user.userId && <SummonPage />}
      {tab === NavigationTabs.UPGRADE && user.userId && <UpgradePage />}
      {tab === NavigationTabs.BATTLE && user.userId && <BattlePage />}
    </>
  );
}

export default App;
