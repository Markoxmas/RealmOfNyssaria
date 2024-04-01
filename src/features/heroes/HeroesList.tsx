import { useAppSelector } from "../../app/hooks";
import Hero from "./Hero";
import Grid from "@mui/material/Grid";

export default function HeroesList() {
  const heroes = useAppSelector((state) => state.heroes.heroes);

  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <Grid container justifyContent="center" spacing={2}>
        {heroes.map((hero, index) => (
          <Grid item key={index}>
            <Hero hero={hero} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
