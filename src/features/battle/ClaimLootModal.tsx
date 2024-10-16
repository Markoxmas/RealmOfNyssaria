import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import {
  openDropsModal,
  closeDropsModal,
  claimLoot,
  Battle,
} from "./battleSlice";
import Drop from "./Drop";
import { ICONS } from "../../assets/icons";
import capitalizeFirstLetter from "./lib/capitalizeFirstLetter";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-around",
};

export default function ClaimLootModal() {
  const dispatch = useAppDispatch();
  const { dropsModalOpen, drops, battle } = useAppSelector(
    (state) => state.battle
  );
  const inventory = useAppSelector((state) => state.inventory);

  const onClaimLoot = () => {
    dispatch(claimLoot({ battle_id: battle._id, inventory_id: inventory._id }));
    dispatch(openDropsModal());
  };
  return (
    <div>
      <Button onClick={() => dispatch(onClaimLoot)} variant="contained">
        Claim loot
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={dropsModalOpen}
        onClose={() => dispatch(closeDropsModal())}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={dropsModalOpen}>
          <Box sx={style}>
            <div>
              <b>Congratulations! You've claimed:</b>
            </div>
            <div style={{ display: "flex" }}>
              {Object.keys(drops).map((drop) => {
                return (
                  <Drop
                    name={drop}
                    amount={drops[drop]}
                    icon={ICONS[capitalizeFirstLetter(drop)]}
                  />
                );
              })}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
