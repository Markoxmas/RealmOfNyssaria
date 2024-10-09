import { Card, CardMedia } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { Hero } from "../heroes/heroesSlice";
import { AVATARS } from "../../assets/avatars";
import StarRateIcon from "@mui/icons-material/StarRate";

function renderStars(hero: Hero) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(<StarRateIcon key={hero._id + i} sx={{ color: starsColor }} />);
  }
  return stars;
}

export default function BattleHeroes() {
  const { battle } = useAppSelector((state) => state.battle);
  const { heroes } = useAppSelector((state) => state.heroes);
  const heroesInBattle: Hero[] = [];

  if (battle) {
    const lastMilestone =
      battle.battleMilestones[battle.battleMilestones.length - 1];
    lastMilestone.heroes.forEach((hero) => {
      const foundHero = heroes.find(
        (inventoryHero) => hero._id === inventoryHero._id
      );
      if (foundHero) {
        heroesInBattle.push(foundHero);
      }
    });
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
      {heroesInBattle.map((hero) => {
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
                {hero.name} [{hero.level}]
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
      })}
    </div>
  );
}
