import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { Hero as HeroType } from "../heroes/heroesSlice";
import { AVATARS } from "../../assets/avatars/index";
import StarRateIcon from "@mui/icons-material/StarRate";

function renderStars(hero: HeroType) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(
      <StarRateIcon
        key={hero._id + i}
        sx={{ color: starsColor, width: "20px" }}
      />
    );
  }
  return stars;
}

export default function SummonedHero({ hero }: { hero: HeroType }) {
  return (
    <Card
      sx={{
        width: 100,
        textAlign: "center",
        border: "3px solid rgba(189, 195, 199, 1)",
        padding: "2px",
        borderRadius: "10px",
        background: "rgba(218, 223, 225, 1)",
      }}
    >
      <div>
        <b>{hero.name}</b>
      </div>
      <CardMedia
        component="img"
        height="100"
        width="100"
        image={AVATARS[hero.image]}
        alt={hero.name}
        style={{ borderRadius: "10px" }}
      />
      <div>{renderStars(hero)}</div>
    </Card>
  );
}
