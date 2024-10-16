import { Box, Paper } from "@mui/material";
import { Sacrifice, openStarUpModal } from "./upgradeSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { AVATARS } from "../../assets/avatars";
import { ICONS } from "../../assets/icons";
import { Hero } from "../heroes/heroesSlice";
import StarRateIcon from "@mui/icons-material/StarRate";

function renderStars(hero: Hero) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(
      <StarRateIcon key={hero._id + i} sx={{ color: starsColor, width: 15 }} />
    );
  }
  return stars;
}

export default function StarUpSlot({
  sacrifice,
  slot,
}: {
  sacrifice: Sacrifice;
  slot: number;
}) {
  const dispatch = useAppDispatch();
  const { hero, chosenSacrifices } = useAppSelector((state) => state.upgrade);

  const openModal = (slot: number) => {
    dispatch(openStarUpModal(slot));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        "& > :not(style)": {
          m: 1,
          width: 100,
          height: 128,
          borderRadius: "5px",
        },
      }}
      onClick={() => openModal(slot)}
    >
      {hero && (
        <Paper
          elevation={3}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {sacrifice.same ? (
            <img
              src={AVATARS[hero.image]}
              width={80}
              height={80}
              style={{
                borderRadius: "100px",
                marginTop: "5px",
                opacity:
                  chosenSacrifices[slot].length === sacrifice.amount ? 1 : 0.4,
              }}
            />
          ) : (
            <img
              src={ICONS.HeroIcon}
              width={60}
              height={60}
              style={{
                margin: 10,
                opacity:
                  chosenSacrifices[slot].length === sacrifice.amount ? 1 : 0.4,
              }}
            />
          )}
          <div>{renderStars(hero)}</div>
          <div>
            {chosenSacrifices[slot].length}/{sacrifice.amount}
          </div>
        </Paper>
      )}
    </Box>
  );
}
