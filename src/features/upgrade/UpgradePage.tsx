import { useAppSelector } from "../../app/hooks";
import HeroUpgradeDisplay from "./HeroUpgradeDisplay";
import UpgradeTabs from "./UpgradeTabs";

export default function UpgradePage() {
  const hero = useAppSelector((state) => state.upgrade.hero);
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <HeroUpgradeDisplay hero={hero} />
      <UpgradeTabs />
    </div>
  );
}
