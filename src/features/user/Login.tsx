import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { goToRegister, onUpdateField, login } from "./userSlice";

export default function Login() {
  const dispatch = useAppDispatch();
  const { username, password } = useAppSelector((state) => state.user);

  const verifyLoginData = () => {
    if (username.length && password.length) {
      dispatch(login({ username, password }));
    } else {
      console.log("Error in register data");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          maxWidth: 500,
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" component="div" sx={{ margin: "5px" }}>
            Login
          </Typography>
          <TextField
            id="username"
            label="Username"
            variant="outlined"
            sx={{ margin: "5px" }}
            onChange={(event) => {
              dispatch(
                onUpdateField({
                  id: event.target.id,
                  value: event.target.value,
                })
              );
            }}
            value={username}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            sx={{ margin: "5px" }}
            onChange={(event) => {
              dispatch(
                onUpdateField({
                  id: event.target.id,
                  value: event.target.value,
                })
              );
            }}
            value={password}
          />
        </CardContent>
        <CardActions
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{ marginBottom: "15px" }}
            onClick={verifyLoginData}
          >
            Submit
          </Button>
          <Typography variant="body2" onClick={() => dispatch(goToRegister())}>
            <u>Register</u>
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}
