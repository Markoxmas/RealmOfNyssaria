import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  closeBattleModal,
  initModalBattleHeroes,
  initModalAvailableHeroes,
  addHeroToBattle,
  removeHeroFromBattle,
  Battle,
} from "./battleSlice";
import { Divider, Paper } from "@mui/material";
import { Hero } from "../heroes/heroesSlice";
import StarRateIcon from "@mui/icons-material/StarRate";
import { AVATARS } from "../../assets/avatars";
import getBattleSlots from "./lib/getBattleSlots";
import getHeroesFromBattle from "./lib/getHeroesFromBattle";
import getAvailableHeroes from "./lib/getAvailableHeroes";
import { updateBattleHeroes } from "./battleSlice";

function renderStars(hero: Hero) {
  let stars = [];
  const starsAmount = hero.stars > 5 ? hero.stars - 5 : hero.stars;
  const starsColor = hero.stars > 5 ? "red" : "yellow";
  for (let i = 0; i < starsAmount; i++) {
    stars.push(<StarRateIcon key={hero._id + i} sx={{ color: starsColor }} />);
  }
  return stars;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function BattleModal({ battle }: { battle: Battle }) {
  const dispatch = useAppDispatch();
  const { battleModalOpen, modalBattleHeroes, modalAvailableHeroes } =
    useAppSelector((state) => state.battle);

  const finishModifyingHeroes = () => {
    dispatch(
      updateBattleHeroes({
        battle_id: battle._id,
        heroes_ids: modalBattleHeroes.map((hero) => hero._id),
      })
    );
    dispatch(closeBattleModal());
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={battleModalOpen}
        onClose={() => dispatch(closeBattleModal())}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={battleModalOpen}>
          <Box sx={style}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                "& > :not(style)": {
                  m: 1,
                  width: 130,
                  height: 150,
                },
              }}
            >
              {getBattleSlots(modalBattleHeroes).map((hero) => {
                return hero !== null ? (
                  <Paper
                    elevation={3}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "space-around",
                    }}
                    onClick={() => dispatch(removeHeroFromBattle(hero))}
                  >
                    <div>
                      <b>
                        {hero.name} [{hero.level}]
                      </b>
                    </div>
                    <img
                      src={AVATARS[hero.image]}
                      width={80}
                      height={80}
                      style={{ borderRadius: "100px", marginTop: "5px" }}
                    />
                    <div>{hero.cp}</div>
                    <div>{renderStars(hero)}</div>
                  </Paper>
                ) : (
                  <Paper elevation={3} style={{ width: 130, height: 150 }} />
                );
              })}
            </Box>
            <Divider style={{ margin: 10 }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                overflowY: "auto",
                maxHeight: "40vh",
                "& > :not(style)": {
                  m: 1,
                  width: 130,
                  height: 150,
                },
              }}
            >
              {modalAvailableHeroes &&
                [...modalAvailableHeroes]
                  .sort((a, b) => b.cp - a.cp)
                  .map((hero) => {
                    return (
                      <Paper
                        elevation={3}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "space-around",
                        }}
                        onClick={() => dispatch(addHeroToBattle(hero))}
                      >
                        <div>
                          <b>
                            {hero.name} [{hero.level}]
                          </b>
                        </div>
                        <img
                          src={AVATARS[hero.image]}
                          width={80}
                          height={80}
                          style={{ borderRadius: "100px", marginTop: "5px" }}
                        />
                        <div>{hero.cp}</div>
                        <div>{renderStars(hero)}</div>
                      </Paper>
                    );
                  })}
            </Box>
            <div style={{ textAlign: "center" }}>
              <Button
                variant="contained"
                style={{ margin: 10 }}
                onClick={finishModifyingHeroes}
              >
                FINISH
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
