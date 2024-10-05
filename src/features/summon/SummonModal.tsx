import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { Button } from "@mui/material";
import { closeModal } from "./summonSlice";
import SummonHeroList from "./SummonHeroList";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function SummonModal() {
  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.summon.modalOpen);
  const handleClose = () => {
    dispatch(closeModal());
  };
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={modalOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={modalOpen}>
          <Box sx={style}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Congratulations! You summoned:
              </Typography>
              <SummonHeroList />
              <Button
                variant="contained"
                onClick={() => dispatch(closeModal())}
              >
                Close
              </Button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
