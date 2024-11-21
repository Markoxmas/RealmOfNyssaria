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
import getAvailableHeroes from "../battle/lib/getAvailableHeroes";

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
  const {
    starUpModalOpen,
    upgradeInfo,
    starUpModalSlot,
    chosenSacrifices,
    hero: chosenHero,
  } = useAppSelector((state) => state.upgrade);
  const { heroes } = useAppSelector((state) => state.heroes);
  const { battle } = useAppSelector((state) => state.battle);
  const currentSacrificesAmount =
    upgradeInfo.sacrifices[starUpModalSlot]?.amount;
  const numOfEmptySlots = currentSacrificesAmount
    ? currentSacrificesAmount - chosenSacrifices[starUpModalSlot].length
    : 0;
  const modalHeroes = upgradeInfo.sacrifices[starUpModalSlot]?.same
    ? getAvailableHeroes(heroes, battle).filter(
        (hero) =>
          chosenHero?.name === hero.name &&
          hero.stars === upgradeInfo.sacrifices[starUpModalSlot]?.stars
      )
    : getAvailableHeroes(heroes, battle).filter(
        (hero) => hero.stars === upgradeInfo.sacrifices[starUpModalSlot]?.stars
      );
  const chosenHeroIds = chosenSacrifices[starUpModalSlot]
    ?.map((hero) => hero._id)
    .concat(chosenHero ? [chosenHero._id] : []);
  const availableModalHeroes = modalHeroes.filter(
    (hero) => !chosenHeroIds.includes(hero._id)
  );

  const closeModal = () => {
    dispatch(closeStarUpModal());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={starUpModalOpen}
        onClose={closeModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={starUpModalOpen}>
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
              {chosenSacrifices[starUpModalSlot] &&
                chosenSacrifices[starUpModalSlot]
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
              {[...availableModalHeroes]
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
