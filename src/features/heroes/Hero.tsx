import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Hero as HeroType } from "./heroesSlice";
import { AVATARS } from "../../assets/avatars/index";
import StarIcon from "@mui/icons-material/Star";

function renderStars(hero: HeroType) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(<StarIcon key={hero._id + i} sx={{ color: starsColor }} />);
  }
  return stars;
}

export default function Hero({ hero }: { hero: HeroType }) {
  return (
    <Card
      sx={{
        width: 200,
        textAlign: "center",
        border: "1px solid black",
        padding: "5px",
        borderRadius: "10px",
      }}
    >
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
        style={{ borderRadius: "10px" }}
      />
      <CardContent>
        {renderStars(hero)}
        <Typography variant="body2" color="text.secondary">
          CP: {hero.cp}
        </Typography>
      </CardContent>
    </Card>
  );
}
