import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { setTab, NavigationTabs } from "./navigationSlice";

export default function Navigation() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.navigation.tab);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: NavigationTabs
  ) => {
    dispatch(setTab(newValue));
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Battle" value={NavigationTabs.BATTLE} />
        <Tab label="Heroes" value={NavigationTabs.HEROES} />
        <Tab label="Summon" value={NavigationTabs.SUMMON} />"
      </Tabs>
    </Box>
  );
}
