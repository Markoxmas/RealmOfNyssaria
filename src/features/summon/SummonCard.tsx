import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { summonHeroes } from "./summonSlice";
import { Stackable } from "../inventory/types/itemSystem";

export default function SummonCard() {
  const dispatch = useAppDispatch();
  const inventory = useAppSelector((state) => state.inventory);
  const inventoryItems = inventory.items;
  const scrollOfSummon = inventoryItems.find(
    (item) => item.registryId === "scroll-of-summon"
  ) as Stackable;
  return (
    <Card
      sx={{
        width: 345,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography gutterBottom variant="h5" component="div">
          Summon heroes
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Scrolls of summon: {scrollOfSummon?.quantity}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => dispatch(summonHeroes(1))}
          disabled={scrollOfSummon && scrollOfSummon.quantity < 1}
        >
          Summon 1
        </Button>
        <Button
          size="small"
          onClick={() => dispatch(summonHeroes(10))}
          disabled={scrollOfSummon && scrollOfSummon.quantity < 10}
        >
          Summon 10
        </Button>
      </CardActions>
    </Card>
  );
}
