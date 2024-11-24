import { useAppDispatch, useAppSelector } from "../../app/hooks";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import { openDropsModal, closeDropsModal, claimLoot } from "./battleSlice";
import Drop from "./Drop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
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
  const { dropsModalOpen, drops } = useAppSelector((state) => state.battle);

  const onClaimLoot = () => {
    dispatch(claimLoot());
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
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: 10,
                maxHeight: 300,
                overflowY: "auto",
                padding: 10,
                width: "100%",
              }}
            >
              {drops.map((drop) => {
                return <Drop drop={drop} />;
              })}
            </div>
            <Button
              variant="contained"
              onClick={() => dispatch(closeDropsModal())}
            >
              Claim
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
