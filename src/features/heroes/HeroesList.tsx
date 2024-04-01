import { TextField } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import Hero from "./Hero";
import Grid from "@mui/material/Grid";
import { useState } from "react";

export default function HeroesList() {
  const heroes = useAppSelector((state) => state.heroes.heroes);
  const [searchText, setSearchText] = useState("");
  return (
    <div style={{ margin: "auto", maxWidth: "80%" }}>
      <Grid container justifyContent="center" spacing={2}>
        <div style={{ margin: "30px" }}>
          <TextField
            label="Search"
            type="search"
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
          />
        </div>
      </Grid>
      <Grid container justifyContent="center" spacing={2}>
        {heroes
          .filter((hero) =>
            hero.name.toLowerCase().includes(searchText.toLowerCase())
          )
          .sort((a, b) => b.cp - a.cp)
          .map((hero, index) => (
            <Grid item key={index}>
              <Hero hero={hero} />
            </Grid>
          ))}
      </Grid>
    </div>
  );
}
