import {
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { goToLogin, onUpdateField, register } from "./userSlice";

export default function Register() {
  const dispatch = useAppDispatch();
  const { username, password, repeatPassword } = useAppSelector(
    (state) => state.user
  );

  const verifyRegisterData = () => {
    if (
      username.length &&
      password.length &&
      repeatPassword.length &&
      password === repeatPassword
    ) {
      dispatch(register({ username, password }));
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
            Register
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
          <TextField
            id="repeatPassword"
            label="Repeat password"
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
            value={repeatPassword}
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
            onClick={verifyRegisterData}
          >
            Submit
          </Button>
          <Typography variant="body2" onClick={() => dispatch(goToLogin())}>
            <u>Login</u>
          </Typography>
        </CardActions>
      </Card>
    </div>
  );
}
