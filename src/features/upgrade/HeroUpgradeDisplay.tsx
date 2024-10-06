import { Hero } from "../heroes/heroesSlice";
import { AVATARS } from "../../assets/avatars/index";
import StarRateIcon from "@mui/icons-material/StarRate";

function renderStars(hero: Hero) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(
      <StarRateIcon
        key={hero._id + i}
        sx={{ color: starsColor, width: "30px", height: "30px" }}
      />
    );
  }
  return stars;
}

export default function HeroUpgradeDisplay({ hero }: { hero: Hero | null }) {
  return (
    <>
      {hero !== null && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div>
            <b>{hero.name}</b>
          </div>
          <div>Lv. {hero.level}</div>
          <div>
            <img
              src={AVATARS[hero.image]}
              width={250}
              height={250}
              style={{ borderRadius: "10px" }}
            />
          </div>
          <div>{renderStars(hero)}</div>
          <div>CP: {hero.cp}</div>
        </div>
      )}
    </>
  );
}
