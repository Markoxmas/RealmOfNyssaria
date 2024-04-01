import Button from "@mui/material/Button";
import Navigation from "./features/navigation/Navigation";
import HeroesPage from "./features/heroes/HeroesPage";
import { useAppSelector } from "./app/hooks";
import { NavigationTabs } from "./features/navigation/navigationSlice";

function App() {
  const tab = useAppSelector((state) => state.navigation.tab);
  return (
    <>
      <Navigation />
      {tab === NavigationTabs.HEROES && <HeroesPage />}
    </>
  );
}

export default App;
