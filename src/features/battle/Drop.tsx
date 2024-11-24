import Card from "@mui/material/Card";
import {
  Currency,
  Equipment,
  Stackable,
  Unstackable,
} from "../inventory/types/itemSystem";
import { ICONS } from "../../assets/icons";

export default function Drop({
  drop,
}: {
  drop: Equipment | Stackable | Unstackable | Currency;
}) {
  const quantity = (drop as Stackable | Currency).quantity;
  return (
    <Card
      sx={{
        width: 130,
        height: 130,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div>{drop.name}</div>
      <img src={ICONS[drop.icon]} width={60} height={60} />
      {quantity ? <div>{quantity}</div> : <div>&nbsp;</div>}
    </Card>
  );
}
