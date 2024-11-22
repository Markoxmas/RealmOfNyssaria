import { UpgradeState } from "../upgradeSlice";

export default function getEmptySlotAmount(upgrade: UpgradeState) {
  const currentSacrificesAmount =
    upgrade.upgradeInfo.sacrifices[upgrade.starUpModalSlot]?.amount;

  return currentSacrificesAmount
    ? currentSacrificesAmount -
        upgrade.chosenSacrifices[upgrade.starUpModalSlot].length
    : 0;
}
