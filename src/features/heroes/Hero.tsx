import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Hero as HeroType } from "./heroesSlice";
import { AVATARS } from "../../assets/avatars/index";
import StarRateIcon from "@mui/icons-material/StarRate";

function renderStars(hero: HeroType) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(<StarRateIcon key={hero._id + i} sx={{ color: starsColor }} />);
  }
  return stars;
}

export default function Hero({ hero }: { hero: HeroType }) {
  return (
    <Card
      sx={{
        width: 150,
        textAlign: "center",
        border: "3px solid rgba(189, 195, 199, 1)",
        padding: "2px",
        borderRadius: "10px",
        background: "rgba(218, 223, 225, 1)",
      }}
    >
      <div>
        <b>
          {hero.name} Lv. {hero.level}
        </b>
      </div>
      <CardMedia
        component="img"
        height="150"
        width="150"
        image={AVATARS[hero.image]}
        alt={hero.name}
        style={{ borderRadius: "10px" }}
      />
      <div>
        <div>{hero.cp} CP</div>
        {renderStars(hero)}
      </div>
    </Card>
  );
}
