import { useEffect } from "react";
import Navigation from "./features/navigation/Navigation";
import HeroesPage from "./features/heroes/HeroesPage";
import SummonPage from "./features/summon/SummonPage";
import UpgradePage from "./features/upgrade/UpgradePage";
import { useAppSelector, useAppDispatch } from "./app/hooks";
import { NavigationTabs } from "./features/navigation/navigationSlice";
import { getInventory } from "./features/inventory/inventorySlice";

function App() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.navigation.tab);

  useEffect(() => {
    dispatch(getInventory());
  }, []);
  return (
    <>
      <Navigation />
      {tab === NavigationTabs.HEROES && <HeroesPage />}
      {tab === NavigationTabs.SUMMON && <SummonPage />}
      {tab === NavigationTabs.UPGRADE && <UpgradePage />}
    </>
  );
}

export default App;
