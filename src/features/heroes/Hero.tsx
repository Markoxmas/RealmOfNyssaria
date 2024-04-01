import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Hero as HeroType } from "./heroesSlice";
import { AVATARS } from "../../assets/avatars/index";

export default function Hero({ hero }: { hero: HeroType }) {
  return (
    <Card sx={{ width: 200, textAlign: "center", border: "1px solid black" }}>
      <CardHeader
        title={
          <Typography variant="body1" noWrap>
            <b>{hero.name}</b>
          </Typography>
        }
        subheader={`Lv. ${hero.level}`}
      />
      <CardMedia
        component="img"
        height="200"
        width="200"
        image={AVATARS[hero.image]}
        alt={hero.name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          CP: {hero.cp}
        </Typography>
      </CardContent>
    </Card>
  );
}
