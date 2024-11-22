import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { closeStarUpModal, toggleSacrificeChoice } from "./upgradeSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Button, Divider, Paper } from "@mui/material";
import { Hero } from "../heroes/heroesSlice";
import { AVATARS } from "../../assets/avatars";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Dispatch } from "@reduxjs/toolkit";
import getAvailableHeroesForSacrifice from "./lib/getAvailableHeroesForSacrifice";
import getEmptySlotAmount from "./lib/getEmptySlotAmount";

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

function renderHero(hero: Hero, dispatch: Dispatch) {
  return (
    <Paper
      elevation={3}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-around",
      }}
      onClick={() => {
        dispatch(toggleSacrificeChoice(hero));
      }}
    >
      <img
        src={AVATARS[hero.image]}
        width={80}
        height={80}
        style={{ borderRadius: "100px", marginTop: "5px" }}
      />
      <div>{renderStars(hero)}</div>
    </Paper>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function StarUpModal() {
  const dispatch = useAppDispatch();
  const upgrade = useAppSelector((state) => state.upgrade);
  const { heroes } = useAppSelector((state) => state.heroes);
  const { battle } = useAppSelector((state) => state.battle);

  const numOfEmptySlots = getEmptySlotAmount(upgrade);
  const availableHeroesToSacrifice = getAvailableHeroesForSacrifice(
    heroes,
    battle,
    upgrade
  );

  const closeModal = () => {
    dispatch(closeStarUpModal());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={upgrade.starUpModalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={upgrade.starUpModalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 128,
                  height: 128,
                },
              }}
            >
              {upgrade.chosenSacrifices[upgrade.starUpModalSlot] &&
                upgrade.chosenSacrifices[upgrade.starUpModalSlot]
                  .concat(new Array(numOfEmptySlots).fill(null))
                  .map((hero) => {
                    if (hero !== null) {
                      return renderHero(hero, dispatch);
                    } else {
                      return <Paper elevation={3}></Paper>;
                    }
                  })}
            </Box>
            <Divider style={{ margin: "10px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 128,
                  height: 128,
                },
                marginBottom: "10px",
                overflowY: "auto",
                maxHeight: "40vh",
              }}
            >
              {[...availableHeroesToSacrifice]
                .sort((a, b) => b.cp - a.cp)
                .map((hero) => {
                  return renderHero(hero, dispatch);
                })}
            </Box>
            <div style={{ width: "100%", textAlign: "center" }}>
              <Button variant="contained" onClick={closeModal}>
                Done
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
